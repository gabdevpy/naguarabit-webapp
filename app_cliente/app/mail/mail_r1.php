<?php

send_email();

	//TODO. pasar detalles como parametro
	//TODO. pasar cuerpo del email como parametro, o el tipo de email, y aqui decidir cual es el cuerpo
	//TODO. definir plantilla web para el cuerpo de los mensajes de email
function send_email(){

	//details
	$moneda1     = 'Gs';
	$moneda2     = 'Bs'; 
	$monedaUSD   = 'USD'; 
	$monto1      = 300000; //Origen, Gs.
	$monto2      = 8582364.74; //Bs. 
	$montoUSD    = 45.17; //USD
	$pais_origen  = 'Paraguay';
	$pais_destino = 'Venezuela';
	$nro_trans   = 12345687;
	$nombre_usuario = 'Gabriel';

	//format montos
	$monto1 = number_format($monto1, 0, '', '.'); //evaluar si se colocan decimales
	$montoUSD = number_format($montoUSD, 2, ',', '.');
	$monto2 = number_format($monto2, 2, ',', '.');

	// the message
	$msg = "Hola, ". $nombre_usuario .".<br> Tu solicitud de remesa ha sido recibida.<br> Se procesará en las proximas 4 horas. <br><br>".
	"\n	A continuación los detalles de la operación:" ."<br><br>".
	"\n<b>Código de transaccción: " . $nro_trans."</b><br>".
	"\nEnviado desde: " . $pais_origen."<br>".
	"\nEnviado hacia: " . $pais_destino. "<br>".
	"\nMonto enviado en " . $moneda1 ." (Guaraníes): " . $monto1 . "<br>".
	"\nMonto enviado en USD (dólares): " . $montoUSD . "<br>".
	"\nMonto a recibir en " . $moneda2 . " (Bolívares): " . $monto2. "<br>";

	// use wordwrap() if lines are longer than 70 characters
	$msg = wordwrap($msg, 70);

	$to      = "gab.perez.py@gmail.com";
	//$to      = "ja.aguilar.e@gmail.com";
	//$to      = "dinaosmapy@gmail.com";
	$subject = "Naguarabit - has solicitado el envío de una remesa";
	$headers = "From: remesas@naguarabit.com" ."\r\n"
            //."Reply-To: remesas@naguarabit.com" ."\r\n"
	          ."MIME-Version: 1.0" . "\r\n"
            ."Content-type: text/html; charset=utf-8";

	//TODO. usar correo corporativo
	//$headers = "From: webmaster@naguarabit.com";

  $outp = '';

  echo  $msg;
	// send email
	if(mail($to, $subject, $msg, $headers)){
    echo "<br><br><b><span style='color:blue'>Email sent to: ". $to . "</span></b>";
  	//$outp ='{"resultado":"OK"}';
    return true;
	}
  else{
    echo "<br><br><span style='color:red'>Email sending failed</span>";
  	//$outp ='{"resultado":"ERROR", "mensaje":"Email sending failed"}';
    return false;
  }
  	

  /*TODO. evaluar respuesta de ejecucion
	$outp = mail($to,$subject,$msg,$headers);
  $outp ='{"resultado":"OK"}';
  //en caso de error
  $outp .='{"resultado":"ERROR"';
  $outp .=',"mensaje":"' .$err. '"';
  $outp .= '}'
  */
	
  //$outp ='{"resultado":"OK"}';
  //echo($outp);

	//mail("someone@example.com","My subject",$msg);
}
?>