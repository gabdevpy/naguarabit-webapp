<?php

send_email();

	//TODO. pasar detalles como parametro
	//TODO. pasar cuerpo del email como parametro, o el tipo de email, y aqui decidir cual es el cuerpo
	//TODO. definir plantilla web para el cuerpo de los mensajes de email
function send_email(){

/*
	//details
	$nro_trans=12345;
	$pais_origen='Paraguay';
	$pais_destino='Venezuela';
*/

	// the message
	$msg = "Tu solicitud de remesa ha sido recibida. Se procesara en las proximas horas. Los detalles a continuacion:";
	/*
	."\nTu número de transaccción es" . $nro_trans
	."\nEnviado desde: " . $pais_origen
	."\nEnviado hacia: " . $pais_destino;
	*/

	// use wordwrap() if lines are longer than 70 characters
	$msg = wordwrap($msg, 70);

	$to      = "gab.perez.py@gmail.com";
	$subject = "Naguarabit has solicitado el envio de una remesa";
	$headers = "From: naguarabit@gmail.com";

	//TODO. usar correo corporativo
	//$headers = "From: webmaster@naguarabit.com";

  $outp = '';

	// send email
	if(mail($to, $subject, $msg, $headers))
    //echo "Email sent";
  	$outp ='{"resultado":"OK"}';
  else{
  	//$outp ='{"resultado":"ERROR", "mensaje":"Email sending failed"}';
    echo "Email sending failed";
    return;
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
  echo($outp);

	//mail("someone@example.com","My subject",$msg);
}
?>