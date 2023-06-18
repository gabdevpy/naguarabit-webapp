'use strict';

angular.module('myApp.bancos', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bancos', {
    templateUrl: 'bancos/list.html',
    controller: 'bancosCtrl'
  });
}])

//para auto enfocar un input
.directive('autoFocus', function($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $timeout(function() {
          // use a timout to foucus outside this digest cycle!
              element[0].focus(); //use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
            }, 0);
        }
    };
})

.controller('bancosCtrl', ['$scope', '$http', function($scope, $http) {
  //-alert('Hola');
	//*//*debugger;
  console.log('controlador -bancos- inicio');
	$scope.saludo = "Saludo desde ctrl. bancos";

	//devuelve lista en formato json
   $http.get("./bancos/list.php")
   .then(function (response) {
      $scope.resultados = response.data.records;
    });
 
  //devuelve lista de paises en formato json
   $http.get("./paises/list.php")
   .then(function (response) {
      $scope.lista_paises = response.data.records;
    });

  console.log('controlador -monedas- fin');
}]

);