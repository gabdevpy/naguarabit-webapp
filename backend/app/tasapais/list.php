<?php
/*
tasapais/list.php
2020-05-06
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

$sql ="SELECT * FROM pais WHERE activo order by nombre";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"id":"'  . $rs["id"]  . '"';
  $outp .= ',"codigo":"'  . $rs["codigo"]  . '"';
  $outp .= ',"nombre":"' . $rs["nombre"] . '"';
  $outp .= ',"cod_moneda":"'  . $rs["cod_moneda"]  . '"';
  $outp .= ',"tasa_vs_ves":'.  1 .''; //todo. agregar parte del query relacionado a tasas
  $outp .= ',"tasa_vs_usd":'.  2 .''; //todo. agregar parte del query relacionado a tasas

  //reemplaza saltos de linea, pues rompen el objeto json
  $observ = str_replace(array("\r\n", "\r", "\n"), " ", $rs["observ"]); 
  $outp .= ',"observ":"'  . $observ  . '"';

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