'use strict';

angular.module('myApp.usuarios', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuarios', {
    templateUrl: 'usuarios/index.html',
    controller: 'usuariosCtrl'
  });
}])

//para auto enfocar un input
.directive('autoFocus', function($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          /*
            attrs.$observe("autoFocus", function(newValue){
                if (newValue === "true")
                    $timeout(function(){element.focus()});
            });
            */
            $timeout(function() {
          // use a timout to foucus outside this digest cycle!
              element[0].focus(); //use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
            }, 0);
        }
    };
})

.controller('usuariosCtrl', ['$scope', '$http', function($scope, $http) {
  //-alert('Hola');
	////*debugger;
  console.log('controlador -usuarios- inicio');
	$scope.saludo = "Saludo desde ctrl";

	//devuelve lista de usuarios en formato json
   $http.get("./usuarios/list.php")
   .then(function (response) {
      $scope.resultados = response.data.records;
    });

//abre vista detalle en modo new
 $scope.new = function (){
  location.href = '#!/user/new';
}; 


  console.log('controlador -usuarios- fin');
}]

);