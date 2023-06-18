'use strict';



// Declare app level module which depends on views, and core components

angular.module('myApp', [

  'ngRoute'

  ,'myApp.inicio'

  ,'myApp.user'

  ,'myApp.pais'

  ,'myApp.ciudad'

  ,'myApp.calc'

  ,'myApp.transacc',

  ,'myApp.transaccResumen'

  ,'myApp.calcPago'

  ,'myApp.ArchivosAdjuntos'

  ,'myApp.mail'

  ,'myApp.chat'

  ,'myApp.formapago'

  ,'myApp.formpago'
  
  ,'myApp.bancos'

  //,'ui.bootstrap.demo'

])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');



//ruta por defecto

  $routeProvider.otherwise({redirectTo: '/inicio'});

}])

;

