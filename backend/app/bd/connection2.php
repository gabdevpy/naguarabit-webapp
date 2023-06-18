<?php

/*

obtiene conexion con base datos de frontend, en hosting

*/



//get connection, en wampserver

//host, user, password, bd

//$conn = new mysqli("localhost", "venebit", "venebit", "naguarab_wp37");

//$conn2 = new mysqli("server128.web-hosting.com", "naguarab_wp37", "SZtP7!p11[", "naguarab_wp37");
$conn = new mysqli("localhost", "naguarab_wp397", "SZtP7!p11[", "naguarab_wp397");





//get connection, en hosting

//host, user, password, bd

//$conn = new mysqli("localhost", "naguarab_backend", "Naguarabit.exito", "naguarab_backend");



//handle utf-8 encoding

$conn->set_charset("utf8");



// Check connection

if ($conn->connect_error) {

    die("Connection failed: " . $conn2->connect_error);

}

else{

    //echo "Connected successfully";

}



//print("Connection database status: OK");

?>