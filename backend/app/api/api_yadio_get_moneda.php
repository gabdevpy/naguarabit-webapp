<?php
/*hacer consulta a api de Yadio, debuelve valores de referencia actual respecto a la moneda sol peruano
//TODO. generalizarlo para cualquier moneda
*/

//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//TODO la moneda se debe pasar como parametro al archivo php
$moneda = "PYG";
$URL = "https://api.yadio.io/rate/" + $moneda;
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
