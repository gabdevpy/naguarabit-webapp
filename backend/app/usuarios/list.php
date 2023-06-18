<?php
/*
users.php
2019-07-12
using customers.php from example in https://www.w3schools.com/angular/angular_sql.asp
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

$sql="SELECT * from user order by nombre";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"id":"'     		.$rs["id"]  		 . '"';
  $outp .= ',"login":"'  		.$rs["login"] 	 . '"';
  $outp .= ',"nombre":"' 		.$rs["nombre"]	 . '"';
  $outp .= ',"email":"'  		.$rs["email"] 	 . '"';
  $outp .= ',"cod_pais":"'  . $rs["cod_pais"]. '"';
  $outp .= '}';
}
$outp ='{"records":['.$outp.']}';
//TODO. manejar el error cuando no se consigue data
$conn->close();

echo($outp);

/*todo, hacer join de tabla users, con paises	 y ciudades*/
/*
  $outp .= ',"ciudad":"' . $rs["cod_ciudad"] . '"';
  $outp .= ',"pais":"'  . $rs["cod_pais"]  . '"';
*/
?>