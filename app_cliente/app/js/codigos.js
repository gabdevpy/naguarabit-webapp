/*
Agrega 0 a la izquierda como sea necesario al numero pasado como parametro, para completar hasta un total de caracteres.
Parametros:
number:el numero
width: numero total de caracteres final
*/
function zeroFillLeft( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // siempre devuelve tipo cadena
}

function rellenarCerosIzq(number, ancho)
{
  console.log('function rellenarCerosIzq. start');
  number = number.padStart(ancho, "0");
  console.log('number: ' + number);
  console.log('function rellenarCerosIzq. start');
  return number;
}

/*prueba de funciones de esta libreria*/
function pruebasCodigo(){
  var id = 1;
  console.log('id: ' + id);
  console.log('codigo: ' + zeroFillLeft(id));
}