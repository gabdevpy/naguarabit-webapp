<?php
//usado desde: calculadora,
//graba datos de pago a destino
//asociado con una transacción específica
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

//get objeto json con los parametros proporcionados a través de llamada tipo RestFul, desde el controlador
$dataParams =  json_decode(file_get_contents('php://input'), true);
//-echo "param.login: \n $dataParams";

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

if($data == null){//validacion pendiente
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

//echo $data['user']['login'];

//TODO. calcular hora en origen, calcular hora en destino. No necesariamente sera igual a la del servidor
//TODO. validar cada dato antes de pasarlo al insert
$sql = "INSERT INTO pago_destino (id_transaccion, login, cod_pais, monto, cod_banco, nroctabank, tipo_cta, doc_titular, nombre_titular, email, telefono, observ_user)
        VALUES ("
        //. "1," //valor de prueba para id_transaccion
  .     $data['id_transaccion'] . ","
  ."'". $data['user']['login']  ."',"
  ."'". $data['cod_pais2']      ."',"
  .     $data['monto2']         .","
  ."'". $data['destino']['cod_banco']     ."',"
  ."'". $data['destino']['nrocta']        ."',"
  ."'". $data['destino']['tipo_cta']      ."',"
  ."'". $data['destino']['doctitular']    ."',"
  ."'". $data['destino']['nombretitular'] ."',"
  ."'". $data['destino']['email'] ."',"
  ."'". $data['destino']['telefono'] ."',"
  ."'". $data['destino']['observ'] ."'"
  .")";

  if($conn->query($sql) == TRUE) {
    if ($outp != "") {$outp .= ",";}
      $outp .='{"resultado":"EXITO"';
      $outp .=',"mensaje":"'     . "Datos guardados (insert)" . '"';
      $outp .=',"sql":"'         . $sql . '"';
      $outp .='}';
  }else{
    $err =  "Error de app, intentando guardar datos. <br> Query: " . $sql . "<br>". $conn->error . "";
    $outp .='{"resultado":"ERROR"';
    $outp .=',"mensaje":"' .$err. '"';
    $outp .= '}';
  }
}

  $outp ='{"records":['.$outp.']}';
  $conn->close();

  echo($outp);

/*
//TODO. asi debe ser
$sql = "INSERT INTO transacciones (login, origen_codpais, destino_codpais, origen_monto, destino_monto, tasa_dolar_origen, tasa_dolar_destino, fechahora_origen, fechahora_destino)
        VALUES (" // --('appcode', 'PAR', 'VEN', '6000', '13000', '6000', '13000', CURRENT_TIMESTAMP+diffhora, CURRENT_TIMESTAMP+diffhora)";
 ."'". $data['user']['login'] ."',"
  ."'". $data['cod_pais1'] ."',"
  ."'". $data['cod_pais2'] ."',"
  ."'". $data['cod_pais2'] ."',"
  .  $data['monto1'] .","
  .  $data['monto2'] .","
  .  $data['monto3'] .","
  .  $data['tasa_origen'] .","
  .  $data['tasa_destino'] .","
  . CURRENT_TIMESTAMP .","
  . CURRENT_TIMESTAMP
  .")";
*/
?>



