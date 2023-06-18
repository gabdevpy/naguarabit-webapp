<?php
/*
users/getuser.php
2019-07-12
uso:
get_user.php?codigo=LOGINUSER
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//+include '../util.php';
include("../bd/connection.php");

if (isset($_GET['codigo'])){
  $codigo = $_GET['codigo'];
}else{
  $codigo="";
}

$outp = "";

if (!isset($codigo)  || $codigo == ""){
  //TODO. devolver mensaje de error
  $err = "No se proporciono parametro: codigo";
  $outp .='{"resultado":"ERROR"';
  $outp .=',"mensaje":"' .$err. '"';
  $outp .= '}';  $outp ='{"records":['.$outp.']}';
  $conn->close();
}

else{
  $sql="SELECT * FROM pais where codigo ='" . $codigo . "' LIMIT 1";
  $result = $conn->query($sql);

  //test sin filtro
  //$result = $conn->query("SELECT * from pais LIMIT 1");

  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{';
    $outp .= '"id":"'         . $rs["id"]               .'"';
    $outp .= ',"codigo":"'    . $rs["codigo"]           .'"';
    $outp .= ',"nombre":"'    . $rs["nombre"]           .'"';
    $outp .= ',"cod_moneda":"'. $rs["cod_moneda"]       .'"';

    //TODO. mostrar saltos de linea en el textarea de manera apropiada
    //replace salto de lineas por espacio
    $observ = str_replace(array("\r\n", "\r", "\n"), " ", $rs["observ"]); 
    $outp .= ',"observ":"'  . $observ  . '"';

    $outp .= '}';
  }
  $outp ='{"records":['.$outp.']}';



  $conn->close();
}
echo($outp);


/*
    //AHORA. reemplaza saltos de linea, pues rompen al objeto json

   //-$outp .= ',"observ":"'    . $rs["observ"]           .'"';
    $observ = str_replace(array('\r\n', '\r', '\n'), '\n', $rs["observ"]); 
    $outp .= ',"observ":"'  . $observ  . '"';

    1opcion>
    //$outp .= ',"observ":"'    . nl2br($rs["observ"])           .'"'; //convierte cada new line en <br/>
otra opcion
    //$observ = str_replace( "\n", '<br />', $rs["observ"]); 
prueba funcion
    //$observ = test_get_nl (); //nl($observ);

//https://stackoverflow.com/questions/42408472/solve-new-line-in-json-via-php
  //Replace your new line with \n before json decode:
  //$json = preg_replace('/\r|\n/','\n',trim($outp));


<!--

$outp .= ',"codpais":"'  . $rs["cod_pais"]     . '"';
  $outp .= ',"codciudad":"'  . $rs["cod_ciudad"]     . '"';
-->
*/
?>

