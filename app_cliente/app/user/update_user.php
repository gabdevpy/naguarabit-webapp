<?php
/*
users/getuser.php
2018-12
uso:
user/insert_user.php
Uso:
en el parametro $_POST['user'] hay que pasarle un arreglo asociativo con los datos del usuario
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create connection
include("../bd/connection.php");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//get objeto json de parametros proporcionados de llamada tipo RestFul, desde ctrl angular
$userParams =  json_decode(file_get_contents('php://input'), true);
//-echo "param.login: \n $userParams";

/*capturar objeto datos a grabar, pasado como parametro post*/
  if (isset($userParams)){
    $user = $userParams;
    //*debug
    //echo "\n data user >> login: " . $user['login'] . "\n";
  }else{
    $user= null;
    //*echo "\n data user vacia \n";
    var_dump($user);
  }


$outp = "";

//TODO. validar datos a guardar
//validacion en proceso
$ok = true;
$err = "";
if(!isset($user) || $user == null)
  $err = "No se proporcionó el arreglo de datos a grabar";
else if (!isset($user['id']) || $user['id'] == null || $user['id'] == 0 || trim($user['id']) == '')
    $err = "Id no especificado";
else if (!isset($user['login']) || $user['login'] == null || trim($user['login']) == '')
    $err = "Login no especificado";
else if (!isset($user['email']) || $user['email'] == null || trim($user['email']) == '')
    $err = "Email o Telefono no especificado";
else if (!isset($user['telefono']) || $user['telefono'] == null || trim($user['telefono']) == '')
    $err = "Teléfono no especificado";


if($err != ''){
  $ok = false;
  $err = "Error en datos de usuario proporcionados para grabar. ".$err;
    $outp .='{"resultado":"ERROR"';
    $outp .=',"mensaje":"' .$err. '"';
    $outp .=',"datos":"'   .var_dump($user). '"';
    $outp .= '}';
}else { //datos validos
  /*
//test datos aleatorios:
  $login = 'login' . rand(5, 100);
  $mail = 'user' . rand(5, 100) . '@mail.com';
  $nombre = 'Nombre ' . rand(5, 100);
  //$sql = "INSERT INTO users(login, nombre, email, cod_pais, cod_ciudad) VALUES('$login', '$nombre', '$mail', 'xcity', 'xpais')";
*/
  $sql = "UPDATE user SET "
  ."login        ='". $user['login'] ."'"
  .",nombre      ='". $user['nombre'] ."'"
  .",email       ='". $user['email'] ."'"
  .",telefono    ='". $user['telefono'] ."'"
  .",cod_pais    ='". $user['cod_pais'] ."'"
  .",cod_ciudad  ='". $user['cod_ciudad'] ."'"
  .",observ      ='". $user['observ'] ."'"
  ."WHERE id     =".  $user['id'].";";
  
  if($conn->query($sql) == TRUE) {
    if ($outp != "") {$outp .= ",";}
      $outp .='{"resultado":"EXITO"';
      $outp .=',"mensaje":"'     . "Datos de usuario guardados" . '"';
      $outp .='}';
  }else{
    $err =  "Error de app, intentando guardar datos:  <br>". $conn->error . "";
    $outp .='{"resultado":"ERROR"';
    $outp .=',"mensaje":"' .$err. '"';
    $outp .=',"sql":"' .$sql. '"';
    $outp .=',"datos":"'   .var_dump($user). '"';
    $outp .= '}';
  }
}

  $outp ='{"records":['.$outp.']}';
  $conn->close();

  echo($outp);
?>