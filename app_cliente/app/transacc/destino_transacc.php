<?php
/*
lista los pagos a destino de una transaccion especifica.
devuelve un objeto json con la data
forma de uso:
transacc/destino_list.php?id=ID_TRANSACC
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

//obtener parametro de URL
if (isset($_GET['id'])){
  $id = $_GET['id'];
}else{
  $id="";
}

$outp = "";

if (!isset($id)  || $id == ""){
$outp ='{"records":['.$outp.']}';
}

else{
  //sin filtro de id
  $sql = "SELECT a.*, b.nombre as nombre_banco, b.nombre_largo as banco_nombre_largo \n"
       . "FROM pago_destino a \n"
       . "INNER JOIN transacciones t ON a.id_transaccion = t.id \n"
       . "LEFT  JOIN banks_pais    b ON b.codigo = a.cod_banco \n"
       . "WHERE a.id_transaccion=" . $id . "\n";
      
  $result = $conn->query($sql);

  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
      $outp .= '{';
      $outp .= '"id":"'     		           . $rs["id"]  	         .'"';
      $outp .= ',"cod_banco":"'  		       . $rs["cod_banco"] 	   .'"';
      $outp .= ',"nombre_banco":"'         . $rs["nombre_banco"]      .'"';
      $outp .= ',"banco_nombre_largo":"'   . $rs["banco_nombre_largo"]      .'"';
      $outp .= ',"nroctabank":"' 		       . $rs["nroctabank"]	       .'"';
      $outp .= ',"monto":"'                . $rs["monto"] .'"';
      $outp .= ',"date_created":"'         . $rs["date_created"].'"';
      $outp .= ',"check_realizado":'       . $rs["check_realizado"];
      $outp .= ',"login_user_pagador":"'   . $rs["login_user_pagador"] .'"';
      $outp .= ',"img_comprob":"'          . $rs["img_comprob"] .'"';
      $outp .= ',"check_user_cliente":"'   . $rs["check_user_cliente"].'"';
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
