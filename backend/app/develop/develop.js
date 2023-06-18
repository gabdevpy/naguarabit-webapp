'use strict';

angular.module('myApp.develop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/develop', {
    templateUrl: 'develop/develop.html',
    controller: 'developCtrl'
  });
}])

.controller('developCtrl', ['$scope', function($scope) {
	
	$scope.saludo = "Hola, vamos a verificar algunos detalles de la app...";

/*TODO. usar arreglo o lista para agregar lista de cambios, sin editar el html
en el html hacer un ciclo o ng-repeat para mostrar lista*/
var lista_cambios = [];

}]

);