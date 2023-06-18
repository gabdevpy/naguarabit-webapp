'use strict';

angular.module('myApp.mail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider, $http) {
  $routeProvider.when('/mail', {
    templateUrl: 'mail/mail.html',
    controller: 'mailCtrl'
  });
}])

.controller('mailCtrl', ['$scope', '$http', function($scope, $http) {
	console.log('estoy en el controlador de mail');
	/*
	debugger;
	$scope.mail = "Hola, vamos a verificar algunos detalles de la app...";
	*/

//TODO. agregar fecha de envio. dia/hh:mm de acuerdo a la hora del pais de origen
//TODO. agregar fecha de programacion de la remesa
var fecha = new Date();

//function para enviar email
$scope.send_mail = function() {
  console.log('contrDolador-mail- funcion:send_mail - inicio');      
  console.log('fecha: ' + fecha);      

  //TODO. probar envio de data via parametros
  //$http.post('./mail/mail_test.php', JSON.stringify($scope.data))

    scope.mostrarError = false;
    $scope.mostrarExito = false;

  $http.post('./mail/mail.php')
  .then(function (response) {
    if (response.data.resultado == 'OK'){
          $scope.msg = "Correo enviado";
          $scope.mostrarExito = true;
          //$scope.showError = false;
        }else{
          $scope.msg = '\n' + response.data.mensaje;
          $scope.showError = true;
          $scope.mostrarExito = false;
        }
    }, function (response) {
      $scope.msg = "Error intentando enviar email";
      $scope.statusval = response.status;
      $scope.statustext = response.statusText;
          $scope.mostrarError = true;
          $scope.mostrarExito = false;
  });

  console.log('controlador-mail- funcion:send_mail - fin');      
  }//send_mail


/*
	 ctrl.init_main = function (){
		$scope.msg= '';
   }

	//ES LO PRIMERO QUE CARGA
            ctrl.$onInit = function(){
                ctrl.init_main();
            }
            */
}]

);