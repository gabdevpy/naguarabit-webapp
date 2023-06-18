<?php
//trae lista de bancos de un pais especifico
//se indica cual consulta realizar mediante
//un parametro GET['codpais']
/*
bancos/lists_short.php
2020-05-25
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

//TODO. generalizar a todos los paises
if (isset($_GET['codpais'])){
  $codpais = $_GET['codpais'];
}else{
  $codpais="";
}

$outp = "";

if (!isset($codpais)  || $codpais == ""){
  //TODO. devolver mensaje de error
  $err = "No se proporciono parametro: codpais";
  $outp .='{"resultado":"ERROR"';
  $outp .=',"mensaje":"' .$err. '"';
  $outp .= '}';  $outp ='{"records":['.$outp.']}';
  $conn->close();
}


//PRUEBA, solo bancos de Vzla
//$sql ="SELECT codigo, nombre FROM banks_pais WHERE activo=1 AND codpais='VEN' ORDER BY nombre";

//considerar cualquier pais
$sql ="SELECT codigo, nombre FROM banks_pais WHERE activo=1 AND codpais='".$codpais."' ORDER BY nombre";
//*echo("sql:". $sql);
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