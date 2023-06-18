<?php

//OBJETIVO: actualiza estado de verificacion del pago destino por parte del cliente
//lo puede realizar el operador y el cliente

//usado desde: transacciones
//TODO. usar desde: calculadora

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
    . "check_realizado = 2" //1:test //2:confirmado. debe ser 2. El 1 es para pruebas, mientras finalizo la transaccion "                  //pago confirmado
    . ", check_user_cliente = 1"                  //TODO: verificar
    . ", login_user_admin = " . "'". "admin" . "'" //TODO: corregir campo, asignar el operador logueado
    ." WHERE id = " . $id_pago_destino;
    //TODO. add condition id_transaccion = $data['id_transaccion'] . ";"


  if($conn->query($sql)) {

    $ok = true;
    
    //return rows affected/updated
    $count = $conn->affected_rows;

    //* echo $count;
    //$outp .= "'rows': " . $count;

    //echo $count . "rows updated"; //debug

    //TODO. devolver en el json resultado

    //TODO. YA NO HACE FALTA?. mejor manejar en el controlador:
    //v2. cuando haya varios pagos destino por transaccion
    //ejecutar el siguiente update de transacciones, solo cuando NO haya mas pagos pendientes
    
    //hacer query para obtener el total de pagos pendientes
    //$total_pago_pendiente = 0;
    //if ($total_pago_pendiente == 0){//ya se pago todo en destino
    //add al json el atributo: "pago_destino_pendientes" : true

    }



    //*DEBUG
    if ($ok) { // || $count > 0 || $outp != '':::NOTA: se usaban estas otras variables, pero antes cualquier fallo mejor ir por solo un switch boolean ok

      //$outp .= "\n ,";

      $outp .='{"resultado":"EXITO"';

      $outp .=',"mensaje":"'    . "Pago destino actualizado" . '"';

      $outp .=',"id_pago_destino":'  . $id_pago_destino;

      $outp .= ',"rows_affected":' . $count;

      //TODO. add transacion al mensaje de salida
      //$outp .=',"id_transaccion":'     . $data['id_transaccion'];

      $outp .=',"sql":"'        . $sql . '"'; //for debugging

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







