'use strict';

angular.module('myApp.tasapais', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tasapais', {
    templateUrl: 'tasapais/list.html',
    controller: 'tasapaisCtrl'
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

.controller('tasapaisCtrl', ['$scope', '$http', function($scope, $http) {
  //-alert('Hola');
  //*debugger;
  console.log('controlador -paises- inicio');
  $scope.saludo = "Saludo desde ctrl";

	//devuelve lista de paises en formato json
 $http.get("./tasapais/list.php")
 .then(function (response) {
  $scope.resultados = response.data.records;
});

//abre vista detalle en modo new
 $scope.new = function (){
  location.href = '#!/pais/new';
}; 

console.log('controlador -paises- fin');
}]

);