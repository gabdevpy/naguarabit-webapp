<?php

//connection local
//host, bd, user, password
//$conn = new mysqli("localhost", "venebit", "venebit", "venebit");


//hosting Neolo
//host, user, password, bd
//$conn = new mysqli("localhost", "naguarab_backend", "Naguarabit.exito", "naguarab_backend");

//base datos en hosting Namecheap
//host, user, password, bd
$conn = new mysqli("server128.web-hosting.com", "naguarab_backend", "Naguarabit.exito", "naguarab_backend");

//handle utf-8 encoding
$conn->set_charset("utf8");


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//TODO. usar
//set Uso horario de Vzla, para usar en todas las transacciones
//$conn->mysql_query("SET SESSION time_zone = '-4:00'"); 


//TODO. esto se debería mostrar, si y solo si se pasa un parametro al archivo php,
//como debug=1
//TODO. print this message via console.info
//print("Connection database status: OK <br>");
//print("Today is " . date("Y/m/d") . "<br>");
//print("The time is " . date("h:i:sa"));

?>