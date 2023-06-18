<?php
/*
file: transacc/list_filtrada.php

descripcion:
obtiene datos de todas las transacciones, segun unos filtros

Uso:
en el parametro $_GET['filtros'] hay que pasarle una cadena con los valores de los filtros
ejemplo: list_filtrada?
*/
//TOOO. agregar un filtro de periodo de fechas, ejemplo: la ultima semana, el ultimo mes, los ultimos N dias, hoy
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


//se obtiene el parametro 'filtros' para usar en el query
  $filtros="";
  if (isset($_GET['filtros'])){
    $filtros = $_GET['filtros'];
  }else{
    $filtros="";
    //TODO. en este caso devolver un json vacio
  }

  //*echo $filtros;

$outp = "";

if (!isset($filtros) || $filtros == ""){
  //TODO. devolver mensaje de error
  $err = "No se proporcionio parametro para filtrar la data: filtros";
  $outp .='{"resultado":"ERROR"'; //es un error pero no generara mensaje en la vista
  $outp .=',"mensaje":"' .$err. '"';
  $outp .= '}';
}else{

  //operadores y caracteres para hacer los filtros
  $filtros = str_replace(':','=',      $filtros);  //igual
  $filtros = str_replace('!', '!=',    $filtros);  //diferente
  $filtros = str_replace('.AND.', ' AND ', $filtros); //condiciones AND
  $filtros = str_replace('.OR.',  ' OR ',  $filtros); //condiciones OR
}

//realizar la busqueda

include("../bd/connection.php");

//TODO. armar la condicion del where
$where="";
if ($filtros != ""){
  $where = " WHERE " . $filtros;
}

//TODO. agregar a referencia: codpaisorigen,codipaisdestino
$sql = "SELECT a.*, CONCAT(a.origen_codpais,a.destino_codpais,LPAD(a.id, 4, '0')) AS refcompleta, LPAD(a.id, 4, '0') AS referencia, u.nombre from transacciones a INNER JOIN user u USING (login) ".$where." ORDER BY a.date_created DESC, a.login DESC";

//TODO. puedo enviar el query resultante como parte del json, para debug

//echo $where."\n";
//echo $sql."\n";

$outp = "";
$result = $conn->query($sql);

//$outp .= '{{"sql":"'     . $sql   .'"}';

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{';
  $outp .= '"id":"'     		       . $rs["id"]  	         .'"';
  $outp .= ',"login":"'  		       . $rs["login"] 	       .'"';
  $outp .= ',"referencia":"'       . $rs["referencia"]     .'"';
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


  //EXPERIMENTO.DEBUG. retornar la cosulta sql como un campo dentro del json
  $outp .= ',"sql":"'.$sql.'"';

  $outp .= '}';
}


//$outp ='{"records":['.$outp.']}';
$outp ='{"records":['.$outp.']}';
//TODO. manejar el error cuando no se consigue data
$conn->close();

echo($outp);

/*
  $outp .= ',"ciudad":"' . $rs["cod_ciudad"] . '"';
  $outp .= ',"pais":"'  . $rs["cod_pais"]  . '"';
*/
?>
