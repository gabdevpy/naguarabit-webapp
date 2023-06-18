'use strict';
angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    //templateUrl: 'login/template-password-confirm.html',
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {

  //$ctrl = this;
	
  /*
	//*debugger;
	console.log('estoy en el controlador de pruebas');
  */
  $scope.saludo = "Saludo desde el CTRL de pruebas";
  $scope.recordar = false;
  $scope.data = {};
  $scope.data.login = "";
  $scope.data.password = "";

  



/*
TODO. cuando se logra el login, se deben guardar variables de sesión,
tales como:

*/


//LO QUE ESTA A PARTIR DE ACA, NO ESTA SIENDO USADO
/*
//agrega 0 a la izquierda del numero n
function appendLeadingZeroes(n){
  if(n <= 9)
    return "0" + n;
  else
    return n
}

//si y es igual al año actual, se devuelve "-año", sino devuelve cada vacia
function getYear(y){
  let current_datetime = new Date()
  let currentyear = current_datetime.getFullYear()
  if(y == currentyear)
    return "";
  else
    return "-"+y
}

//prueba conversion de string a date
function formatDate(userDOB) {
  const dob = new Date(userDOB);
  const monthNames = ['Ene', 'Feb', 'Marz', 'Abr', 'May', 'Jun', 'Jul',
  'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const day = appendLeadingZeroes(dob.getDate());
  const monthIndex = dob.getMonth();
  const year = dob.getFullYear();
  const hora = appendLeadingZeroes(dob.getHours());
  const min = appendLeadingZeroes(dob.getMinutes());

  // return day + ' ' + monthNames[monthIndex] + ' ' + year;
  return `${day}/${monthNames[monthIndex]}/${year} ${hora}:${min}`;
}
console.log('fecha: ' + formatDate('2019-08-01 12:05'));
console.log('fecha: ' + formatDate('2019-08-10 09:05'));
console.log('fecha: ' + formatDate('2019-08-20 14:05'));
console.log('fecha: ' + formatDate('2019-08-30 23:01'));

$scope.model = [];
$scope.model.push({ title: 'Oranges', subitems: ['item1','item2','item3','item4'] });
$scope.model.push({ title: 'Apples', subitems: ['item1', 'item2', 'item3', 'item4'] });
$scope.model.push({ title: 'Tomatoes', subitems: ['item1', 'item2', 'item3', 'item4'] });
$scope.model.push({ title: 'Cucumbers', subitems: ['item1', 'item2', 'item3', 'item4'] });
*/

}])


.directive('accordion', function () {
  return {
    restrict: 'E',
    scope: { model: '='},
    templateUrl: './pruebas/template-accordion.html', //buscar en respaldo    
    link: function (scope, element, attr) {
      scope.parentId = attr.id;
    }

  }
});
