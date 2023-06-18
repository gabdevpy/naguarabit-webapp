<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

$outp = "";
/* query en varias lineas
SELECT b.*
FROM banks_pais b
JOIN pais p ON p.codigo = b.codpais
WHERE p.activo AND b.activo 
ORDER BY b.codpais, b.nombre
--b.id,b.codigo,b.nombre,b.nombre_largo,b.codpais
*/
$sql = "SELECT b.*, p.nombre as nombre_pais
FROM banks_pais b JOIN pais p ON p.codigo = b.codpais
WHERE p.activo AND b.activo
ORDER BY b.codpais, b.nombre";
$result = $conn->query($sql);

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"id":"'            . $rs["id"]            .'"';
  $outp .= ',"codigo":"'        . $rs["codigo"]        .'"';
  $outp .= ',"nombre":"'        . $rs["nombre"]        .'"';
  $outp .= ',"nombre_largo":"'  . $rs["nombre_largo"]  .'"';
  $outp .= ',"codpais":"'       . $rs["codpais"]       .'"';
  $outp .= ',"nombre_pais":"'   . $rs["nombre_pais"]   .'"';
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