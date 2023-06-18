//agrega 0 a la izquierda del numero n, usado para dia, mes, hora, minutos
function appendLeadingZeroes(n){
  if(n <= 9)
    return "0" + n;
  else
    return n
}

/*si y es igual al año actual, se devuelve "-año", sino devuelve cada vacia*/ 
function getYear(y){
  let current_datetime = new Date()
  let currentyear = current_datetime.getFullYear()
  if(y == currentyear)
    return "";
  else
    return "-"+y
}

/*prueba conversion de string a date*/
function formatDate(fecha) {
  //*console.log('fecha dentro de funcion: ' + fecha);
  const dob = new Date(fecha);
  const monthNames = ['Ene', 'Feb', 'Marz', 'Abr', 'May', 'Jun', 'Jul',
  'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const day = appendLeadingZeroes(dob.getDate());
  const monthIndex = dob.getMonth();
  const year = dob.getFullYear();
  const hora = appendLeadingZeroes(dob.getHours());
  const min = appendLeadingZeroes(dob.getMinutes());

  f = `${day}-${monthNames[monthIndex]}-${year} ${hora}:${min}`;
  //*console.log('fecha formateada: ' + f);

  return f;
}


function pruebasFechas(){
  console.log('fecha: ' + formatDate('2019-08-01 12:05'));
  console.log('fecha: ' + formatDate('2019-08-10 09:05'));
  console.log('fecha: ' + formatDate('2019-08-20 14:05'));
  console.log('fecha: ' + formatDate('2019-08-30 23:01'));
}