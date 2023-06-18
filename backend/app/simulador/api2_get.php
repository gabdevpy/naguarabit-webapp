<?php
/*hacer consulta a api de Yadio*/

//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$URL = "https://apiv2.bitcoinaverage.com/widgets/global/ticker/BTCPYG";
$outp = "";

//opcion 1
$json = file_get_contents($URL);
$outp = json_decode($json);

if ($outp != "")
  $outp ='{"records":['.$json.']}';
//TODO. manejar el error cuando no se consigue data
else {
  $outp ='{"records":[{"error": "error en obtener data"]}';
}
echo($outp);
?>
