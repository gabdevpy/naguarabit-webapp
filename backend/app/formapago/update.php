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

//obtener objeto json de parametros proporcionados desde ctrl angular (llamada tipo RestFul)
$params =  json_decode(file_get_contents('php://input'), true);
//-echo "param.codigo: \n $params";

/*capturar objeto datos a grabar, pasado como parametro post*/
  if (isset($params)){
    $data = $params;
    //*debug
    //echo "\n data user >> codigo: " . $data['codigo'] . "\n";
  }else{
    $data= null;
    //*echo "\n data user vacia \n";
    //TODO. manejar error, y mostrar al usuario
    //-var_dump($data);
  }


$outp = "";

//TODO. validar datos a guardar
//validacion en proceso
$ok = true;
$err = "";
if(!isset($data) || $data == null)
  $err = "No se proporcionó el arreglo de datos a grabar";
else if (!isset($data['id']) || $data['id'] == null || $data['id'] == 0 || trim($data['id']) == '')
    $err = "Id no especificado";
else if (!isset($data['codigo']) || $data['codigo'] == null || trim($data['codigo']) == '')
    $err = "Codigo no especificado";
else if (!isset($data['newstatus']) || $data['newstatus'] == null || trim($data['newstatus']) == '')
    $err = "Nuevo estatus no especificado";


if($err != ''){
  $ok = false;
  $err = "Error en datos proporcionados para grabar. ".$err;
    $outp .='{"resultado":"ERROR"';
    $outp .=',"mensaje":"' .$err. '"';
    $outp .=',"datos":"'   .var_dump($data). '"';
    $outp .= '}';
}else { //datos validos

  $sql = "UPDATE formapago_origen SET "
  ."activo ='". $data['newstatus'] ."'"
  ."WHERE id    =". $data['id'] .";";
  
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
    $outp .=',"datos":"'   .var_dump($data). '"';
    $outp .= '}';
  }
}

  $outp ='{"records":['.$outp.']}';
  $conn->close();

  echo($outp);
?>