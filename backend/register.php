<?php
header("Access-Control-Allow-Origin: *");
require_once('user.php');
$data = json_decode(file_get_contents("php://input"), TRUE);
$user = new User();
$user->register($data);
?>