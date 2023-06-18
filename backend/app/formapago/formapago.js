//TODO. cambiar querys

'use strict';

angular.module('myApp.formapago', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/formapago', {
    templateUrl: 'formapago/list.html',
    controller: 'formaPagoCtrl'
  });
}])


//directiva que permite para auto enfocar un input
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


.controller('formaPagoCtrl', ['$scope', '$http', function($scope, $http) {
  //-alert('Hola');
	//*//*debugger;
  console.log('controlador -bancos- inicio');

	//devuelve lista en formato json
   $http.get("./formapago/list.php")
   .then(function (response) {
      $scope.resultados = response.data.records;
    });
 
   //devuelve lista de paises en formato json
   $http.get("./paises/list.php")
   .then(function (response) {
      $scope.lista_paises = response.data.records;
    });

   /*
    //abre vista detalle en modo new
     $scope.new = function (){
      location.href = '#!/pais/new';
      console.log(location.href);
    }; 
  */




  console.log('controlador -formapago- fin');
}]

);