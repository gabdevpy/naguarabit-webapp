'use strict';
angular.module('app', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat', {
    templateUrl: 'chat/index.html',
    //templateUrl: 'chat/template-password-confirm.html',
    controller: 'chatCtrl'
  });
}])


/*
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat/upload', {
    templateUrl: 'chat/upload.html',
    //templateUrl: 'chat/template-password-confirm.html',
    controller: 'chatCtrl'
  });
}])
*/

.controller('chatCtrl', ['$scope', '$http', function($scope, $http) {
	/*
	//*debugger;
	console.log('estoy en el controlador de chat');
  */

  $scope.saludo = "Saludo desde el CTRL de chat";

}]);

