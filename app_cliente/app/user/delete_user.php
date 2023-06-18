<?php
/*
users/getuser.php
2019-07-12
uso:
delete_user.php?login=LOGINUSER
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

if (isset($_GET['login'])){
  $login = $_GET['login'];
}else{
  $login="";
}

  //*echo "$login:".$login;

$outp = "";

if (!isset($login) || $login == ""){
  //devolver mensaje de error
  $err = "Error en parametro login para borrar el registro";
  $outp .='{"resultado":"ERROR"';
  $outp .=',"mensaje":"' .$err. '"';
  $outp .= '}';
}

else{
  //*test
  //-$result = $conn->query("DELETE * from user where login ='" . $login . "'");
  $sql="DELETE from user WHERE login ='" . $login. "'";
  
  if($conn->query($sql) == TRUE) {
    if ($outp != "") {$outp .= ",";}
    $outp .='{"resultado":"EXITO"';
    $outp .=',"mensaje":"'     . "Cuenta de usuario borrada" . '"';
    $outp .='}';
  }else{
    $err = "Error al intentar borrar cuenta de usuario.<br>".
    "Detalles: <br>".
    "Sentencia a ejecutar: " . $sql . "<br>" 
    ."Descripcion del error: ". $conn->error;
    $outp .='{"resultado":"ERROR"';
    $outp .=',"mensaje":"' .$err. '"';
    $outp .= '}';
  } 
}

$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>