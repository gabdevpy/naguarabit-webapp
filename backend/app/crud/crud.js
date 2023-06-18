'use strict';
angular.module('myApp.crud', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/crud', {
    templateUrl: 'crud/index.html',
    //templateUrl: 'pruebas/template-password-confirm.html',
    controller: 'crudCtrl'
  });
}])

.controller('crudCtrl', ['$scope', '$http', function($scope, $http) {
	/*
	//*debugger;
	console.log('estoy en el controlador de pruebas');
  */
  $scope.saludo = "Saludo desde el CTRL de crud";

}]);
