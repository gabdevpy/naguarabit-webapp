'use strict';

angular.module('myApp.monedas', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/monedas', {
    templateUrl: 'monedas/list.html',
    controller: 'monedasCtrl'
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

.controller('monedasCtrl', ['$scope', '$http', function($scope, $http) {
  //-alert('Hola');
	//*//*debugger;
  console.log('controlador -monedas- inicio');
	$scope.saludo = "Saludo desde ctrl";

	//devuelve lista en formato json
   $http.get("./monedas/list.php")
   .then(function (response) {
      $scope.resultados = response.data.records;
    });

  console.log('controlador -monedas- fin');
}]

);