<?php require_once('functions.php') ?>
<?php require_once('database.php') ?>
<?php
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
// header("Access-Control-Allow-Origin: *");
// $data = json_decode(file_get_contents("php://input"), TRUE);
// echo $data;


class User {
  
private $fname; 
private $lname;
private $email;
private $passw;

private $logemail;
private $logpass;
public $allData;
public $logindata;
public $catgname;


function __construct (){
  // $this->allData =  $a;
  // $a = $a;
  // $a = $a;
  // echo $a["catName"];
  
}

public function register($a) {
  global $database;
 
        if (isset($a["submit"])) {
         
          $fname = validate( $a["fname"]);
          $lname = validate( $a["lname"]);
          $email = validate( $a["email"]);
          $passw = sha1(md5(validate( $a["passw"]))); 
          if ($fname && $lname && $email && $passw) {
            $sqlcheck = "SELECT * FROM `users` WHERE email = '$email'"; 
         
            $result = $database->conn->query($sqlcheck);
            // echo json_encode($result);
            if($result->num_rows >= 1) {
              echo json_encode("Email already exist with an account !");
  
            }  else {
             
              $sql = "INSERT INTO users (firstname, lastname, email, password)
              VALUES ( '$fname',  '$lname', '$email', '$passw')";
              if($database->conn->query($sql) === true) {  
                echo json_encode("Registration Successful.. Sign In");          
              } 
              else {
                echo json_encode("Error during Registration"); 
              }
          }
           
          
          }else {
            echo "Input fields must contain proper values";
          }
         
    }  

   $database->close_connection();
}


public function login($a) {
  global $database;
  if (isset($a["submit"])) {
   
    $logemail = validate($a["email"]);
    $logpass = sha1(md5(validate($a["password"])));

    $sqlcheck = "SELECT * FROM `users` WHERE email = '$logemail' AND  password='$logpass'";
    $result = $database->conn->query($sqlcheck);
    if($result->num_rows >= 1) {
     $resp = array();
      $user = $result->fetch_assoc();
      $userId = $user['user_id'];
      $email = $user["email"];
      $secretKey = "SECRET_KEY";
      $issuedDate = time();
      $expiredDate = $issuedDate + 20000;
      $token = array(
        "iss" => "http://localhost:3000",
        "aud" => "http://localhost:8888",
        "iat" => $issuedDate,
        "nbf" => $issuedDate,
        "exp" => $expiredDate,
        "data" => array(
          "userId" => $userId,
          "email" => $email
        )
      );
      $jwt = JWT::encode($token, $secretKey);
      
        $resp["message"] = "logged in successfuly";
        $resp["access_key"] =  $jwt;
        $resp["email"] =  $email;
        $resp["expiredAt"] = $expiredDate;

        // array(
        //   "message" => "logged in successfuly",
        //   "access_key" => $jwt,
        //   "email" => $email,
        //   "expiredAt" => $expiredDate
        // )   
    

    }  else {
      $resp["message"] = "Invalid Credentials !";
  }
  echo json_encode($resp);

}

$database->close_connection();

} 

public function logout() {

}


public function addCat ($a) {
  global $database;
  if (isset($a["catName"])) { 
    $catname = validate($a["catName"]);
    $sqlcheck = "SELECT * FROM `categories` WHERE category_name = '$catname'";
    $result = $database->conn->query($sqlcheck);
   
    if($result->num_rows >= 1) {
      echo "Category name already exist !";
  
    

    }  else {
      $sql = "INSERT INTO categories (category_name)
      VALUES ('$catname')";
      if($database->conn->query($sql) === true) {  
        echo json_encode("Category name added successfully !");          
      } 
      else {
        echo json_encode("Error during adding !"); 
      }
  }
}
$database->close_connection();
}

public function loadcat() {
  global $database;
  $sqlcheck = "SELECT * FROM categories"; 
  $result = $database->conn->query($sqlcheck);
 echo json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC));

 $database->close_connection();
}

public function addproduct($pname, $pprice, $pquantity, $picname, $catid) {
  global $database;
            $sql = "INSERT INTO products (product_name, product_price, quantity, picture, cat_id)
            VALUES ( '$pname', '$pprice', '$pquantity', '$picname', '$catid')";
            if($database->conn->query($sql) === true) {  
              echo json_encode("Product added successfully");          
            } 
            else {
              echo json_encode("Error while adding product"); 
            }

            $database->close_connection();
}

public function loadproduct() {
  global $database;  
  $qry = "SELECT category_name, GROUP_CONCAT(product_id SEPARATOR '#') product_id, GROUP_CONCAT(product_name SEPARATOR '#') product_name, GROUP_CONCAT(picture SEPARATOR '#') picture from products p join categories c using (cat_id) GROUP by category_name";
  $result = $database->conn->query($qry); 
  $k = mysqli_fetch_all($result,MYSQLI_ASSOC);
  $newarr = array();
  foreach ($k as &$row) { 
    $second = new Stdclass();
    $newObj = new Stdclass(); 
    $newarray = array();
    // echo  $row['category_name'];
    $newObj->id = explode('#', $row['product_id']);
    $newObj->name = explode('#', $row['product_name']);
    $newObj->pics= explode('#', $row['picture']);
    
    
    for ($i=0; $i < count($newObj->id); $i++) {
      if ($newObj->id[$i] !== NULL && $newObj->name[$i]  !== NULL && $newObj->pics[$i]  !== NULL) {
        $iobj = new StdClass();
        $iobj->id = $newObj->id[$i];
        $iobj->name = $newObj->name[$i];
        $iobj->pics= $newObj->pics[$i];
        array_push($newarray, $iobj);
      }
     
    }
   
    $second->cat_name = $row['category_name'];
    $second->items = $newarray;
    array_push($newarr, $second);
  }
  echo json_encode($newarr);
       
       }



}

// $user = new User($data);

// if( isset($data["submit"])) {
//   if ( $data["submit"] === "Register Now") {
//     $user->register();
//   }else {
//     $user->login();
//   }
 
// }else if( isset($data["catName"])){
//   $user->addCat();
 
// }



?>