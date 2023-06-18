<?php
/*
user/get_resumen.php
devuelve un objeto json con la data
forma de uso:
user/get_resumen.php?id=ID_TRANSACC
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

//obtener parametro get de URL
if (isset($_GET['id'])){
  $id = $_GET['id'];
  //* echo $id;
}else{
  $id="";
}

$outp = "";

if (!isset($id)  || $id == ""){
$outp ='{"records":['.$outp.']}';
}

else{
  //sin filtro de id
  $sql = "SELECT b.nombre user_nombre, p.nombre origen_pais_nombre, p2.nombre destino_pais_nombre, \n"
      . "p.cod_moneda as origen_cod_moneda, p2.cod_moneda as destino_cod_moneda, a.*, \n"
      . "e.descripcion as estatus_desc, e.detalles as status_detalles, \n"
      . "LPAD(a.id, 4, '0') as referencia, \n"
      . "a.id as id \n"
      . "FROM transacciones a \n"
      . "INNER JOIN user b USING (login) \n"
      . "LEFT JOIN estatus e ON a.status = e.codigo \n"
      . "LEFT JOIN pais p ON a.origen_codpais = p.codigo \n"
      . "LEFT JOIN (select * from pais) p2 ON a.destino_codpais = p2.codigo \n"
      . "WHERE a.id = " . $id . "\n"
      . "LIMIT 1";

  //*debug
  //echo $sql;

  //+$result = $conn->query($sql);

  //test sin filtro
  $result = $conn->query($sql);

  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{';
    $outp .= '"id":"'     		          . $rs["id"]  	         .'"';
    $outp .= ',"login":"'  		          . $rs["login"] 	   .'"';
    $outp .= ',"user_nombre":"' 		    . $rs["user_nombre"]	       .'"';
    $outp .= ',"origen_codpais":"'      . $rs["origen_codpais"] .'"';
    $outp .= ',"destino_codpais":"'     . $rs["destino_codpais"].'"';
    $outp .= ',"origen_pais_nombre":"'  . $rs["origen_pais_nombre"] .'"';
    $outp .= ',"destino_pais_nombre":"' . $rs["destino_pais_nombre"].'"';
    $outp .= ',"origen_monto":"'        . $rs["origen_monto"]   .'"';
    $outp .= ',"destino_monto":"'       . $rs["destino_monto"]  .'"';
    $outp .= ',"origen_cod_moneda":"'   . $rs["origen_cod_moneda"]   .'"';
    $outp .= ',"destino_cod_moneda":"'  . $rs["destino_cod_moneda"]   .'"';
    $outp .= ',"status":"'              . $rs["status"].'"';
    $outp .= ',"referencia":"'          . $rs["referencia"].'"';
    $outp .= ',"monto_dolares":"'       . $rs["monto_dolares"].'"';
    $outp .= ',"status_PO":"'           . $rs["status_PO"].'"';
    $outp .= ',"status_PD":"'           . $rs["status_PD"].'"';
    $outp .= ',"status":"'              . $rs["status"].'"';
    $outp .= ',"status_desc":"'         . $rs["estatus_desc"].'"';
    $outp .= ',"date_created":"'        . $rs["date_created"].'"';
    $outp .= ',"date_end":"'            . $rs["date_end"].'"';
    $outp .= '}';

    /*
    //TODO. mostrar saltos de linea en el textarea de manera apropiada
    //replace salto de lineas por espacio
    $observ = str_replace(array("\r\n", "\r", "\n"), " ", $rs["observ"]);
    $outp .= ',"observ":"'  . $observ  . '"';
    $outp .= '}';
    */
  }
  $outp ='{"records":['.$outp.']}';
}

$conn->close();
echo($outp);

/*
<!--
$outp .= ',"codpais":"'  . $rs["cod_pais"]     . '"';
  $outp .= ',"codciudad":"'  . $rs["cod_ciudad"]     . '"';
-->
*/
?>
