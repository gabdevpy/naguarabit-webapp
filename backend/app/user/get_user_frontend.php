<?php
/*
user/get_user_frontend.php
devuelve datos en un objeto json de un usuario del frontend-wordpress.

forma de uso:
user/get_user_frontend.php?login=LOGINUSER
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection2.php");

//obtener parametro de URL
if (isset($_GET['login'])){
  $login = $_GET['login'];
}else{
  $login="";
}

$outp = "";

if (!isset($login)  || $login == ""){
$outp ='{"records":['.$outp.']}';
}

else{
  $result = $conn->query("SELECT * from wpil_users where user_login ='" . $login . "' LIMIT 1");

  //test sin filtro
  //$result = $conn->query("SELECT * from user LIMIT 1");

  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{';
    $outp .= '"id":"'               . $rs["ID"]       . '"';
    $outp .= ',"login":"'           . $rs["user_login"]    . '"';
    $outp .= ',"nombre":"'          . $rs["user_nicename"]   . '"';
    $outp .= ',"email":"'           . $rs["user_email"]    . '"';
    $outp .= ',"display_name":"'    . $rs["display_name"] . '"';
    $outp .= ',"user_url":"'        . $rs["user_url"] . '"';
    //+$outp .= ',"user_registered":"' . $rs["user_registered"] . '"';
    $outp .= ',"user_status":"'     . $rs["user_status"] . '"';
    //$outp .= ',"telefono":"'        . $rs["telefono"] . '"';
    //$outp .= ',"cod_pais":"'        . $rs["cod_pais"]     . '"';
    //$outp .= ',"cod_ciudad":"'      . $rs["cod_ciudad"]     . '"';
    //TODO. mostrar saltos de linea en el textarea de manera apropiada
    //replace salto de lineas por espacio
    //$observ = str_replace(array("\r\n", "\r", "\n"), " ", $rs["observ"]);
    //$outp .= ',"observ":"'  . $observ  . '"';
    $outp .= '}';
  }
  $outp ='{"records":['.$outp.']}';
}

$conn->close();
echo($outp);

/*
<!--
$outp .= ',"codpais":"'  . $rs["cod_pais"]     . '"';
  $outp .= ',"codciudad":"'  . $rs["cod_ciudad"]     . '"';
-->
*/
?>
