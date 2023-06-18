'use strict';

angular.module('myApp.develop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/develop', {
    templateUrl: 'develop/develop.html',
    controller: 'developCtrl'
  });
}])

.controller('developCtrl', ['$scope', function($scope) {
	/*//*debugger;
	console.log('estoy en el controlador de saludo.');
	var ctrl=this;
	ctrl.hola="Hola"; //no supe como hacer que funcione
	*/
	$scope.saludo = "Hola, vamos a verificar algunos detalles de la app...";

/*realizar comprobaciones*/
var Ok = true;
//TODO. al iniciar la app. comprobar que existe conexion con la base de datos, que existen las tablas.etc
	$scope.check1 = "Angular funciona: OK"; //si se muestra este msj en el template r
	$scope.check2 = "Conexion con base de datos: " + (Ok ? "Ok" : "Not Ok. Chequear") ;
	$scope.check3 = "Bd existe: " + (Ok ? "Ok" : "Not Ok. Chequear") ;
	$scope.check3 = "Tablas de la base de datos: " + (Ok ? "Ok" : "Not Ok. Chequear") ;

	$scope.greeting =  function(value) { return 'Hola, desde funcion!'; };

  	$scope.double = function(value) { if(value!= null) return value  * 2; else return 0 };

/*
	 ctrl.init_main = function (){
		$scope.saludo = 'Hola!';
		$scope.greeting = 'greeting!';
		console.log('this:'+ this);
		console.log('saludo:'+ ctrl.saludo);
    }

	//ES LO PRIMERO QUE CARGA
            ctrl.$onInit = function(){
                ctrl.init_main();
            }
            */
}]

);