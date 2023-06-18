<?php
/*
list_short.php
2019-07-23
usado para llenar combos de ciudades
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

//obtener parametro de URL
if (isset($_GET['cod_pais'])){
  $cod_pais = $_GET['cod_pais'];
}else{
  $cod_pais="";
}

//var_dump($cod_pais);

$outp = "";
if (!isset($cod_pais)  || $cod_pais == ""){
$outp ='{"records":['.$outp.']}';
}
else{

$sql ="SELECT codigo, nombre FROM ciudad WHERE cod_pais ='" . $cod_pais ."' ORDER BY nombre";
//*echo "$sql:". $sql;
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"codigo":"'  . $rs["codigo"]  . '"';
  $outp .= ',"nombre":"' 	. $rs["nombre"] . '"';
  $outp .= '}';
}
$outp ='{"records":['.$outp.']}';
//TODO. manejar el error cuando no se consigue data
}

$conn->close();
echo($outp);

/*todo, hacer join de tabla paises y ciudades*/
/*
  $outp .= ',"ciudad":"' . $rs["cod_ciudad"] . '"';
  $outp .= ',"pais":"'  . $rs["cod_pais"]  . '"';
*/
?>