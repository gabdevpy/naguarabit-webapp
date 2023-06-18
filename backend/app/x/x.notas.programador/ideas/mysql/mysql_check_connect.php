<?php
//TODO. usar este archivo en los check iniciales
$con=mysqli_connect("localhost","root","","array");
mysqli_set_charset($con,"utf8");

// Check connection
if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}else{
	echo "Conexionn con database OK";
}

//DEVOLVER error o exito en formato json
//recibir 
?>