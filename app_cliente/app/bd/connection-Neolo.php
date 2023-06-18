<?php

//get connection, en wampserver

//host, bd, user, password

//$conn = new mysqli("localhost", "venebit", "venebit", "venebit");



//get connection, en hosting

//host, user, password, bd

$conn = new mysqli("localhost", "naguarab_backend", "Naguarabit.exito", "naguarab_backend");



//handle utf-8 encoding

$conn->set_charset("utf8");



// Check connection

if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);

}



//print("Connection database status: OK");

?>