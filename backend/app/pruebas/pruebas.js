'use strict';
angular.module('myApp.pruebas', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pruebas', {
    templateUrl: 'pruebas/index.html',
    //templateUrl: 'pruebas/template-password-confirm.html',
    controller: 'pruebasCtrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pruebas/errorsform', {
    templateUrl: 'pruebas/template_errorsform.html',
    //templateUrl: 'pruebas/template-password-confirm.html',
    controller: 'pruebasCtrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pruebas/upload', {
    templateUrl: 'pruebas/upload.html',
    //templateUrl: 'pruebas/template-password-confirm.html',
    controller: 'pruebasCtrl'
  });
}])

/*
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pruebas/modal', {
    templateUrl: 'pruebas/modal.html',
    //templateUrl: 'pruebas/template-password-confirm.html',
    controller: 'ModalDemoCtrl'
  });
}])
*/

.controller('pruebasCtrl', ['$scope', '$http', function($scope, $http) {
	/*
	//*debugger;
	console.log('estoy en el controlador de pruebas');
  */

  $scope.saludo = "Saludo desde el CTRL de pruebas";

//agrega 0 a la izquierda del numero n
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

//prueba formato de fecha
console.log('fecha: ' + formatDate('2019-08-01 12:05'));
console.log('fecha: ' + formatDate('2019-08-10 09:05'));
console.log('fecha: ' + formatDate('2019-08-20 14:05'));
console.log('fecha: ' + formatDate('2019-08-30 23:01'));

$scope.model = [];
$scope.model.push({ title: 'Oranges', subitems: ['item1','item2','item3','item4'] });
$scope.model.push({ title: 'Apples', subitems: ['item1', 'item2', 'item3', 'item4'] });
$scope.model.push({ title: 'Tomatoes', subitems: ['item1', 'item2', 'item3', 'item4'] });
$scope.model.push({ title: 'Cucumbers', subitems: ['item1', 'item2', 'item3', 'item4'] });


//prueba validacion de form por filas
$scope.items = [
    {
      name: "Bob",
      color: "Blue",
      nameRequired: true //indica si el campo para esta fila es obligatorio
    },
    {
      name: "Lisa",
      color: "Red",
      nameRequired: false
    },
    {
      name: "Roy",
      color: "Yellow",
      nameRequired: true
    },
    {
      name: "Angela",
      color: "",
      nameRequired: true
    },
    {
      name: "Anthony",
      color: "Purple",
      nameRequired: true
    },
    {
      name: "",
      color: "",
      nameRequired: null
    },
    {
      name: "",
      color: "",
      nameRequired: true
    },
  ]


}])


//directiva para plantilla acordeon
.directive('accordion', function () {
  return {
    restrict: 'E',
    scope: { model: '='},
    templateUrl: './pruebas/template-accordion.html',
    link: function (scope, element, attr) {
      scope.parentId = attr.id;
    }

  }
})

