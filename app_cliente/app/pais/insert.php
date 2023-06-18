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

//TODO. enviar mensaje de error. o quitar
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//get objeto json de parametros proporcionados de llamada tipo RestFul, desde ctrl angular
$dataParams =  json_decode(file_get_contents('php://input'), true);
//-echo "param.codigo: \n $dataParams";

/*capturar objeto datos a grabar, pasado como parametro post*/
  if (isset($dataParams)){
    $data = $dataParams;
    //*debug
    //echo "\n data user >> codigo: " . $data['codigo'] . "\n";
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

  //$sql = "INSERT INTO users(codigo, nombre, cod_moneda, cod_pais, cod_ciudad) VALUES('$codigo', '$nombre', '$mail', 'xcity', 'xpais')";

  $sql = "INSERT INTO pais(codigo, nombre, cod_moneda, observ) VALUES ("
  ."'".  $data['codigo']      ."'"
  .",'". $data['nombre']      ."'"
  .",'". $data['cod_moneda']  ."'"
  .",'". $data['observ']      ."'" //TODO. manejar saltos de linea en valor del campo
  .")";
  
  if($conn->query($sql) == TRUE) {
    if ($outp != "") {$outp .= ",";}
      $outp .='{"resultado":"EXITO"';
      $outp .=',"mensaje":"'     . "Datos guardados" . '"';
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