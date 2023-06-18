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

include("../bd/connection.php");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//get objeto json de parametros proporcionados de llamada tipo RestFul, desde ctrl angular
$dataParams =  json_decode(file_get_contents('php://input'), true);
//-echo "param.login: \n $dataParams";

/*capturar objeto datos a grabar, pasado como parametro post*/
  if (isset($dataParams)){
    $data = $dataParams;
    //*debug
    //echo "\n data user >> login: " . $data['login'] . "\n";
  }else{
    $data= null;
    //*echo "\n data user vacia \n";
  }


$outp = "";

if($data == null){//validacion pendiente
//TODO. validar datos a guardar
/*
if (!isset($user) || $$user == null || !isset($user->id) == null || $user->id == null){
*/  //devolver mensaje de error
  $err = "Error en datos de usuario proporcionados para grabar";
  $outp .='{"resultado":"ERROR"';
  $outp .=',"mensaje":"' .$err. '"';
  $outp .=',"datos":"'   .$data. '"';
  $outp .= '}';

}else { //datos validos
//test datos aleatorios:
  $login = 'login' . rand(5, 100);
  $mail = 'user' . rand(5, 100) . '@mail.com';
  $nombre = 'Nombre ' . rand(5, 100);
  //$sql = "INSERT INTO users(login, nombre, email, cod_pais, cod_ciudad) VALUES('$login', '$nombre', '$mail', 'xcity', 'xpais')";

  $sql = "INSERT INTO user (login, nombre, email, telefono, cod_pais, cod_ciudad) VALUES ("
  ."'". $data['login'] ."'"
  .",'". $data['nombre'] ."'"
  .",'". $data['email'] ."'"
  .",'". $data['telefono'] ."'"
  .",'". $data['cod_pais'] ."'"
  .",'". $data['cod_ciudad'] ."'"
  .")";
  
  if($conn->query($sql) == TRUE) {
    if ($outp != "") {$outp .= ",";}
      $outp .='{"resultado":"EXITO"';
      $outp .=',"mensaje":"'     . "Datos de usuario guardados" . '"';
      $outp .='}';
  }else{
    $err =  "Error de app, intentando guardar datos. <br> Query: " . $sql . "<br>". $conn->error . "";
    $outp .='{"resultado":"ERROR"';
    $outp .=',"mensaje":"' .$err. '"';
    $outp .= '}';
  }
}

  $outp ='{"records":['.$outp.']}';
  $conn->close();

  echo($outp);
?>