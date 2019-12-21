<?php
header("Access-Control-Allow-Origin: *");
require_once('user.php');
$user = new User();
$user->loadproduct();
// echo $catname;




?>