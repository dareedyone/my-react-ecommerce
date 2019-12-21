<?php
header("Access-Control-Allow-Origin: *");
require_once('user.php');
$pname = $_POST["pname"];
$pprice = $_POST["pprice"];
$pquantity = $_POST["pquantity"];
$catid = $_POST["catid"];
$allowed = array('gif', 'png', 'jpg', 'jpeg');
$picname = $_FILES["ppicture"]["name"];
$ext = pathinfo($picname, PATHINFO_EXTENSION);
$ext = strtolower($ext);
if (in_array($ext, $allowed)) {
    $name = rand(). time() . '.' . $ext;
    $location = "../pictures/".$name;
    $a = move_uploaded_file($_FILES["ppicture"]["tmp_name"], $location);
    if ($a) {
        $user = new User();
    $user->addproduct($pname, $pprice, $pquantity, $name, $catid);
    // echo $catname;
    }
}




?>