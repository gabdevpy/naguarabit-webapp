<?php
/*hacer consulta a api de Yadio, debuelve valores de referencia actual relacion entre BTC-Bs, BTC-USD, BTC y otras monedas*/

//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$URL = "https://api.yadio.io/json";
$outp = "";

//opcion 1
$json = file_get_contents($URL);
$outp = json_decode($json);

if ($outp != "")
  $outp ='{"records":['.$json.']}';
else {
  //TODO. manejar el error cuando no se consigue data, para mostrar en la vista
  $outp ='{"records":[{"error": "error en obtener data"]}';
}
echo($outp);
?>
