<?php
/*
transacc/list.php
obtiene lista de todas las transacciones registradas
*/
//TOOO. agregar un filtro de periodo de fechas, ejemplo: la ultima semana, el ultimo mes, los ultimos N dias, hoy
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

//TODO. agregar condiciones iniciales, pq cuando ya la lista sea larga tardara en mostrar...
$where = ""; //condiciones...

//para generar la referencia, uso el id y lo relleno con ceros a la izquierda, hasta 4 caracteres
//LPAD($rs["id"], 4, '0')
$sql="SELECT a.*, LPAD(a.id, 4, '0') AS referencia, u.nombre FROM transacciones a LEFT JOIN user u USING (login) ".$where." ORDER BY a.date_created DESC, a.login DESC";
$result = $conn->query($sql);

//echo $sql;

//OTRA OPCION para forma la referencia puede ser en php: sprintf("%05d", 184); //devuelve 00184

$outp = "";
//$outp = '{{"sql:"' .$sql. '"}';
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{';
  $outp .= '"id":"'     		       . $rs["id"]  	         .'"';
  $outp .= ',"referencia":"'        . $rs["referencia"]     .'"'; //la referencia es de 5 caracteres, formado por el id con ceros a la izq
  $outp .= ',"login":"'  		       . $rs["login"] 	       .'"';
  $outp .= ',"nombre":"' 		       . $rs["nombre"]	       .'"';
  $outp .= ',"origen_codpais":"'   . $rs["origen_codpais"] .'"';
  $outp .= ',"destino_codpais":"'  . $rs["destino_codpais"].'"';
  $outp .= ',"origen_monto":"'     . $rs["origen_monto"]   .'"';
  $outp .= ',"destino_monto":"'    . $rs["destino_monto"]  .'"';
  $outp .= ',"status":"'           . $rs["status"]         .'"';
  $outp .= ',"status_PO":"'        . $rs["status_PO"]      .'"';
  $outp .= ',"status_PD":"'        . $rs["status_PD"]      .'"';
  $outp .= ',"monto_dolares":"'    . $rs["monto_dolares"]  .'"';
  $outp .= ',"date_created":"'     . $rs["date_created"]   .'"';
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
