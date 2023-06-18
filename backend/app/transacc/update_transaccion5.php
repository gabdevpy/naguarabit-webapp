<?php

//OBJETIVO: actualiza estado de pago destino de una transaccion (realizado por operador)

//usado desde: transacciones

//en el objeto dataParams, debe ir el campo 'id_pago_destino'
//y los otros datos necesarios para actualizar la tabla de destino

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json; charset=UTF-8");


include("../bd/connection.php");



//get objeto json con los parametros proporcionados a través de llamada tipo RestFul, desde el controlador

$dataParams =  json_decode(file_get_contents('php://input'), true);

//-echo "param.login: \n $dataParams";


$data = null;

/*capturar objeto datos a grabar, pasado como parametro post*/

  if (isset($dataParams)){

    $data = $dataParams;

    //*debug

    //echo "\n data user >> login: " . $data['login'] . "\n";

  }else{

    $data= null;

    //*echo "\n data user vacia \n";

  }



$outp = "";


if($data == null) {//validacion pendiente

//TODO. validar datos a guardar

/*

if (!isset($user) || $$user == null || !isset($user->id) == null || $user->id == null){

*/  //devolver mensaje de error

  $err = "Error en datos de transaccion proporcionados para grabar";

  $outp .='{"resultado":"ERROR"';

  $outp .=',"mensaje":"' .$err. '"';

  $outp .=',"datos":"'   .$data. '"';

  $outp .= '}';



}else { //datos validos

  /*

//test datos aleatorios:

  $login = 'login' . rand(5, 100);

  $mail = 'user' . rand(5, 100) . '@mail.com';

  $nombre = 'Nombre ' . rand(5, 100);





EJEMPLO:

/*

$sql = "INSERT INTO transacciones

(login_user, user_observ, origen_codpais, destino_codpais, origen_monto, destino_monto, tasa_dolar_origen, tasa_dolar_destino, fechahora_origen)

VALUES ('appcode', ?, 'PAR', 'VEN', '6000', '13000', '6000', '13000', CURRENT_TIMESTAMP);";

*/



//TODO. validar cada dato antes de pasarlo al insert

//TODO. calcular hora en origen, calcular hora en destino. No necesariamente sera igual a la del servidor



//adjuntar comprobante de pago en origen

//TODO. add field:
//login, formapago, img_comprob,
//.$data['id_transaccion'] . ", "

$id_pago_destino = $data['id_pago_destino'];
$count = 0;
$ok = false;

$sql = "UPDATE pago_destino "
    . "SET "
    . "check_realizado = 1"
    . ",fechahora_comprobante = " . "NOW()"
    . ", login_user_pagador = " . "'". "admin" . "'" //TODO. corregir: asignarle el operador logueado
    . ", observ_user_check = " . "'Verificado por operador desde el backend' "  //TODO. add observaciones del operador escritas en la vista
    //TODO. add condition id_transaccion = $data['id_transaccion'] . ";"
    ." WHERE id = " . $id_pago_destino;

  if($conn->query($sql)) {

    $ok = true;
     //return rows affected/updated
    $count = $conn->affected_rows;

  //TODO. ejecutar el siguiente update de transacciones, solo cuando no haya mas pagos pendientes
    
    //$total_pago_pendiente = 0;
    
    //if ($total_pago_pendiente == 0){//se adjuntó comprobante de pago en origen

      //se actualiza tabla transacciones con status: pagado en origen

      //$id_pago_destino = $conn->insert_id;

      //$sql = "UPDATE transacciones SET status_PD = 'OK' \n".
      //."WHERE  id = $data['id_transaccion'] ";


    }



    //*DEBUG

    //*printf ("New Transaction has id: %d.\n", $conn->insert_id);

    if ($count > 0 ) { //$outp != ""

      //$outp .= ",";

      $outp .= '{"resultado":"EXITO"';

      $outp .= ',"mensaje":"'    . "Pago destino actualizado." . '"';

      $outp .= ',"id_pago_destino":'    . $id_pago_destino; //$conn->insert_id;


      $outp .= ',"rows_affected":' . $count;

      $outp .= ',"sql":"'           . $sql . '"'; //for debugging

      //TODO. add al mensaje de salida
      //$outp .=',"id_transaccion":'     . $data['id_transaccion'];
      $outp .='}';

  }else{

    $err =  "Error de app, intentando guardar datos. <br> Query: " . $sql . $conn->error . "";

    $outp .='{"resultado":"ERROR"';

    $outp .=',"mensaje":"' .$err. '"';

    $outp .= '}';

  }

}



  $outp ='{"records":['.$outp.']}';

  $conn->close();



  echo($outp);


?>







