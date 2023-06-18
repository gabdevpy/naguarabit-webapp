<?php
/* ARCHIVO NO USADO, EN VEZ DE ESTE SE USA destino_transacc.php
este tiene todos los campos de la tabla pago_destino
devuelve un objeto json con la data de pago a destino de una transacción.
Forma de uso:
transacc/destino_list.php?id=ID_TRANSACC
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

//obtener parametro get de URL
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
  $sql = "SELECT d.id, id_transaccion, login_user, cod_pais, monto, cod_banco, nroctabank, check_realizado, login_user_pagador, img_comprob, fechahora_comprobante, d.date_created, d.check_admin, login_user_admin, d.fechahora_check, observ_user_check, observ_user, check_user_cliente \n"
    . "FROM pago_destino d JOIN transacciones t ON t.id=d.id_transaccion \n"
    . "WHERE d.id_transaccion = " . $id . "\n";

  //*debug
  //echo $sql;

  //+$result = $conn->query($sql);

  //test sin filtro
  $result = $conn->query($sql);

  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{';
    $outp .= '"id":"'     		            . $rs["id"].'"';
    $outp .= ',"login":"'  		            . $rs["login_user"].'"';
    $outp .= ',"destino_monto":"'         . $rs["monto"].'"';
    $outp .= ',"destino_codpais":"'       . $rs["cod_pais"].'"';
    $outp .= ',"cod_banco":"'             . $rs["cod_banco"] .'"';
    $outp .= ',"nroctabank":"'            . $rs["nroctabank"].'"';
    $outp .= ',"check_realizado":"'       . $rs["check_realizado"].'"';
    $outp .= ',"destino_operador":"'      . $rs["login_user_pagador"].'"';
    $outp .= ',"ruta_img_comprob":"'      . $rs["img_comprob"]   .'"';
    $outp .= ',"fechahora_comprobante":"' . $rs["fechahora_comprobante"].'"';
    $outp .= ',"date_created":"'          . $rs["date_created"].'"';
    $outp .= ',"check_admin":"'           . $rs["check_admin"].'"';
    $outp .= ',"login_user_admin":"'      . $rs["login_user_admin"].'"';
    $outp .= ',"fechahora_check":"'       . $rs["fechahora_check"].'"';
    $outp .= ',"observ_user_check":"'     . $rs["observ_user_check"].'"';
    $outp .= ',"observ_user":"'           . $rs["observ_user"].'"';
    $outp .= ',"check_user_cliente":"'     . $rs["check_user_cliente"].'"';
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
