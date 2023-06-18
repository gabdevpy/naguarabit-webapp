'use strict';

angular.module('myApp.ciudades', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ciudades', {
    templateUrl: 'ciudad/list.html',
    controller: 'ctrlCiudades'
  });
  $routeProvider.when('/ciudades/:codPais', {
    templateUrl: 'ciudad/list.html',
    controller: 'ctrlCiudades'
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

//permite agregar URL en atributo goClick de un tag html
.directive( 'goClick', function ( $location ) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe( 'goClick', function (val) {
      path = val;
    });

    element.bind( 'click', function () {
      scope.$apply( function () {
        $location.path( path );
      });
    });
  };
})

.controller('ctrlCiudades', ['$scope', '$http', function($scope, $http) {
  //-alert('Hola');
  //*debugger;
  console.log('controlador -ciudades- inicio');
  $scope.saludo = "Saludo desde ctrl";

	//devuelve lista de ciudades en formato json
 $http.get("./ciudad/list.php")
 .then(function (response) {
  $scope.resultados = response.data.records;
});

$scope.new = function (){
    location.href = '#!/ciudad/new';
};

 console.log('controlador -ciudades- fin');
}]

);