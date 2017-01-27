<?php
session_start();

$userName = $_SESSION['userName'];

if($userName){
	echo "{\"login\":true,\"user\": \"$userName\"}";
}else{
	echo '{"login":false}';
}