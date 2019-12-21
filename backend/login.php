<?php
require_once('user.php');
header("Access-Control-Allow-Origin: *");
$data = json_decode(file_get_contents("php://input"), TRUE);
$user = new User();
$user->login($data);
?>