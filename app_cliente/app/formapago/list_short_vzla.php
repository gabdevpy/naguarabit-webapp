	<?php
//TODO. este archivo deberia fusionarse con monedas/list.php,
//y se indica cual consulta realizar mediante
//un parametro GET['codpais']
/*
users.php
2019-07-12
using customers.php from example in https://www.w3schools.com/angular/angular_sql.asp
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

//TODO. generalizar a todos los paises
//PRUEBA, solo bancos de Vzla
$sql ="SELECT codigo, nombre FROM banks_pais WHERE activo=1 AND codpais='VEN' ORDER BY nombre";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"codigo":"'  . $rs["codigo"]  . '"';
  $outp .= ',"nombre":"' . $rs["nombre"] . '"';
  $outp .= '}';
}
$outp ='{"records":['.$outp.']}';
//TODO. manejar el error cuando no se consigue data
$conn->close();

echo($outp);

/*todo, hacer join de tabla paises y ciudades*/
/*
  $outp .= ',"ciudad":"' . $rs["cod_ciudad"] . '"';
  $outp .= ',"pais":"'  . $rs["cod_pais"]  . '"';
*/
?>