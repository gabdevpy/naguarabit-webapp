<?php
/*
bancos/get.php
2020-07-14
uso:
bancos/get.php?codigo=CODBANCO
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../bd/connection.php");

if (isset($_GET['codigo'])){
  $codigo = $_GET['codigo'];
}else{
  $codigo="";
}

$outp = "";

if (!isset($codigo)  || $codigo == ""){
  //TODO. devolver mensaje de error
  $err = "No se proporciono parametro: codigo";
  $outp .='{"resultado":"ERROR"';
  $outp .=',"mensaje":"' .$err. '"';
  $outp .= '}';  $outp ='{"records":['.$outp.']}';
  $conn->close();
}

else{
  //$sql="SELECT b.*, p.* FROM formaspago p JOIN bank_pais b USING(cod_banco) WHERE b.codigo ='" . $codigo . "' WHERE activo=1 LIMIT 1";
  //$sql="SELECT f.id, f.codigo, f.nombre, f.nombre_largo, b.codpais, b.tipo_pago FROM formapago_origen f JOIN banks_pais b ON f.cod_banco=b.codigo WHERE f.activo=1 AND b.activo=1 AND b.codigo ='" . $codigo . "' LIMIT 1";
  $sql="SELECT f.id, f.codigo, f.nombre, f.nombretitular, f.doctitular, f.nrocuenta, f.tipocuenta, f.nombre_largo as descripcion, f.tipocuenta_desc, f.ciudad, b.codpais, b.tipo_pago, b.nombre as nombrebank FROM formapago_origen f JOIN banks_pais b ON f.cod_banco=b.codigo WHERE f.activo=1 AND b.activo=1 AND b.codigo ='" . $codigo . "' LIMIT 1";
  $result = $conn->query($sql);

  //test sin filtro
  //$result = $conn->query("SELECT * from pais LIMIT 1");

  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{';
    $outp .= ' "id":"'            . $rs["id"]               .'"';
    $outp .= ',"codigo":"'        . $rs["codigo"]           .'"';
    $outp .= ',"nombre":"'        . $rs["nombre"]           .'"';
    $outp .= ',"nombretitular":"' . $rs["nombretitular"]    .'"';
    $outp .= ',"doctitular":"'    . $rs["doctitular"]       .'"';
    $outp .= ',"nrocuenta":"'     . $rs["nrocuenta"]       .'"';
    $outp .= ',"tipocuenta":"'    . $rs["tipocuenta"]      .'"';
    $outp .= ',"tipocuenta_desc":"'  . $rs["tipocuenta_desc"]      .'"';
    $outp .= ',"tipo_pago":"'     . $rs["tipo_pago"]        .'"';
    $outp .= ',"nombrebank":"'    . $rs["nombrebank"]      .'"';
    $outp .= ',"ciudad":"'        . $rs["ciudad"]      .'"';

    //TODO. manejar saltos de linea en el campo de manera apropiada    
    $descripcion = str_replace(array("\r\n", "\r", "\n"), " ", $rs["descripcion"]); 
    $outp .= ',"descripcion":"'  . $descripcion  . '"';

    /*
    //TODO. mostrar saltos de linea en el textarea de manera apropiada
    //replace salto de lineas por espacio
    $observ = str_replace(array("\r\n", "\r", "\n"), " ", $rs["observ"]); 
    $outp .= ',"observ":"'  . $observ  . '"';
  */
    $outp .= '}';
  }
  $outp ='{"records":['.$outp.']}';



  $conn->close();
}
echo($outp);


/*
    //AHORA. reemplaza saltos de linea, pues rompen al objeto json

   //-$outp .= ',"observ":"'    . $rs["observ"]           .'"';
    $observ = str_replace(array('\r\n', '\r', '\n'), '\n', $rs["observ"]); 
    $outp .= ',"observ":"'  . $observ  . '"';

    1opcion>
    //$outp .= ',"observ":"'    . nl2br($rs["observ"])           .'"'; //convierte cada new line en <br/>
otra opcion
    //$observ = str_replace( "\n", '<br />', $rs["observ"]); 
prueba funcion
    //$observ = test_get_nl (); //nl($observ);

//https://stackoverflow.com/questions/42408472/solve-new-line-in-json-via-php
  //Replace your new line with \n before json decode:
  //$json = preg_replace('/\r|\n/','\n',trim($outp));


<!--

$outp .= ',"codpais":"'  . $rs["cod_pais"]     . '"';
  $outp .= ',"codciudad":"'  . $rs["cod_ciudad"]     . '"';
-->
*/
?>

