<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

$outp = "";
$sql ="SELECT * FROM moneda WHERE activo ORDER BY nombre";
$result = $conn->query($sql);

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"id":"'  . $rs["id"]            .'"';
  $outp .= ',"codigo":"'  . $rs["codigo"]    .'"';
  $outp .= ',"nombre":"' . $rs["nombre"]     .'"';
  $outp .= ',"simbolo":"'  . $rs["simbolo"]  .'"';
  $outp .= ',"nombre_plural":"'  . $rs["nombre_plural"]  .'"';
  $outp .= '}';
}
$outp ='{"records":['.$outp.']}';
//TODO. manejar el error cuando no se consigue data
$conn->close();

echo($outp);

/*CONVERSION PARA SALTOS DE LINEA EN JSON

  //-$outp .= ',"observ":"'  . $rs["observ"]  . '"';
  //$observ = str_replace( "\n", '<br />', $rs["observ"]); 


  //-$outp .= ',"observ":"'  . $rs["observ"]  . '"';
  //AHORA. reemplaza saltos de linea, pues rompen al objeto json
  //$observ = str_replace( "\n", '<br />', $rs["observ"]); 
*/

/*todo, hacer join de tabla paises y ciudades*/
/*
  $outp .= ',"ciudad":"' . $rs["cod_ciudad"] . '"';
  $outp .= ',"pais":"'  . $rs["cod_pais"]  . '"';
*/
?>