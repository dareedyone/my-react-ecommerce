<?php
require_once('user.php');
header("Access-Control-Allow-Origin: *");
$user = new User();
$user->loadcat();
?>