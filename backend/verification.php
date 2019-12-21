<?php 
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Authorization");
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
$headers = apache_request_headers();
// echo json_encode($headers);
$secret_key = "SECRET_KEY";
$data = json_encode(file_get_contents('php://input'));

$authHeader = $headers['Authorization'];
$arr = explode(" ", $authHeader);
$access_token =$arr[1];

if($access_token) {
    try{
        $decoded = JWT::decode($access_token, $secret_key, array('HS256'));
        echo json_encode(
            array(
                "message" => "access granted",
                "isAuthenticated" => true
            )
            );
    }catch(Exception $e) {
        echo json_encode(
            array(
                "message" => "access denied",
                "isAuthenticated" => false,
                "error" => $e->getMessage()
            )
            ); 
    }
}
?>