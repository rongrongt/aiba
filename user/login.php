<?php
$user = $_REQUEST['user'];
$pass = $_REQUEST['pass'];

session_start();

if($user == 'rr' && $pass == '123'){
	$_SESSION['userName'] = 'rr';
	echo '{"code":200,"msg": "登录成功"}';
}else{
	echo '{"code":500,"msg": "登录失败"}';
}