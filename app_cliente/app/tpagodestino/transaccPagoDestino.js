'use strict';



angular.module('myApp.transaccPagoDestino', ['ngRoute'])



//enrutamiento a resumen de una transaccion, se busca por su id

.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/tpagodestino/:id_pago_destino', {

    templateUrl: 'tpagodestino/tpagodestino.html',

    controller: 'ctrlTransaccPagoDestino'

  });

}])





/*
//TODO. revisar si usaré estas rutas. enrutamiento a resumen pagos destino de transaccción

.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/transaccion/destino', {

    templateUrl: 'transacc/destino.html',

    controller: 'ctrlTransaccionPagoDestino'

  });

}])
*/


.controller('ctrlTransaccPagoDestino', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  //TODO. usar este, para seguridad, no usar scope
  var ctrl = this;

  $scope.data = [];

  //para mostrar mensajes

  $scope.showError = false;

  $scope.mostrarExito = false;

  $scope.showErrorNotFound = false;

  $scope.showForm = true;



  //?. TODO. quitar este bloque?
  //datos de transacción

  //-$scope.id_transaccion = $routeParams.id_transaccion;
  //-console.log('id_transaccion: ' + $scope.id_transaccion);

  $scope.id_pago_destino = $routeParams.id_pago_destino;
  console.log('id_pago_destino: ' + $scope.id_pago_destino);
  //?


  //captura parametro - id de transacción

  $scope.capturarParametro = function(){
    console.log('controlador-transaccPagoDestino- capturarParametro. inicio');

    $scope.id_pago_destino = $routeParams.id_pago_destino;
    console.log('id_pago_destino: ' + $scope.id_pago_destino);

    //TODO. validar parametro, que sea numerico entero

    console.log('controlador-tpagodestino- capturarParametro. fin');
  }





  //funcion para OBTENER DATOS DE transaccion, y los guarda en variable json

  $scope.getDataPagoDestino = function() {

    console.log('controlador-getDataPagoDestino. inicio');

    $http.get("./tpagodestino/resumen_get.php?id=" + $scope.id_pago_destino)

    .then(function (response) {

      console.log('getDataPagoDestino. then');

      var data = response.data.records;

      if (data[0] != null){

        console.log('controlador-getDatapagodestino. SI trajo datos');

        $scope.data = data[0];

        $scope.showForm = true;

      }

      else{

        console.log('controlador-getDatapagodestino. NO trajo datos');

        $scope.showForm = false;

        $scope.msg = "Pago destino con id: " + $scope.id_pago_destino + " no encontrada";

        $scope.showErrorNotFound = true;

      }

      console.log('controlador-getDataagodestino. then. end');

  },

  function(data, status) {

    console.error('Error en llamada a busqueda dato: ', status, data);

    $scope.msg = "Error consultando datos";

    $scope.showError = true;

    $scope.showForm = false;

    });
    
    //TODO: gestionar error, cuando no se traigan los datos del usuario, mostrar mensaje en vista

  };





//formatear valores de campo date_created

$scope.formatDateCreated = function (data){

  // Obteniendo todas las claves del JSON

  var json = angular.copy(data);

  for (var clave in json){

    // Controlando que json realmente tenga esa propiedad

    if (json.hasOwnProperty(clave)) {

      // Mostrando en pantalla la clave junto a su valor

      console.log('fecha: ' + json[clave].date_created);

      console.log('fecha formateada: ' + formatDate(json[clave].date_created));

      json[clave].date_created = formatDate(json[clave].date_created);

    }

  }

  return json;

};




/* TODO. BORRAR FUNCION
 //funcion para OBTENER DATOS DE transaccion, y los guarda en variable json

 $scope.getDataPagosDestino = function() {

   console.log('controlador -resumen- getDataPagosDestino. start');



   //TODO. agregar uso de parametro

   $http.get("./transacc/destino_transacc.php?id=" + $scope.id_transaccion)

   .then(function (response) {

     if (response.data.records){

       $scope.resultados_destino = response.data.records;

       console.log('resultados_destino: ' + JSON.stringify($scope.resultados_destino));

       $scope.resultados_destino = $scope.formatDateCreated($scope.resultados_destino);

       console.log('controlador -resumen- getDataPagosDestino. data_destino = ');

       console.log($scope.resultados_destino);



      //sumar los pagos realizados

      $scope.pago_pendiente = 0.00;

      var total_pagado = 0.00;

      var total_destino = 0.00;

      for(var i = 0; i < $scope.resultados_destino.length; i++) {

          var fila = $scope.resultados_destino[i];

          total_destino += parseFloat(fila.monto);

          //verifica si este pago fue realizado

          if (fila.check_realizado == 1)

            total_pagado += parseFloat(fila.monto);

          console.log('monto en posicion ' + i + '= ' + fila.monto);

      }

      console.log('total pagado destino:' + total_pagado);

      $scope.total_pagado = total_pagado;

      $scope.pago_pendiente = total_destino - $scope.total_pagado;



      $scope.destino_showForm = true;

   }

   else{

     $scope.destino_showForm = false;

     $scope.msg = "Info no encontrada: Pagos a destino con id transaccion: " + $scope.id_transaccion;

     $scope.destino_showErrorNotFound = true;

   }

 },

 function(data, status) {

   console.error('Error en llamada a busqueda dato: ', status, data);

   $scope.msg = "Error consultando datos";

   $scope.destino_showError = true;

   $scope.destino_showForm = false;

   });   //TODO: gestionar error, cuando no se traigan los datos del usuario, mostrar mensaje en vista

  console.log('controlador -resumen- getDataPagosDestino. fin');

 };
*/




//funcion llamada al inicio

$scope.init_function = function(){

  console.log('ctrl -transaccPagoDestino.init_function.start');

  $scope.saludo = "Saludo desde el ctrl-transaccPagoDestino";

  $scope.capturarParametro();

  if($scope.id_pago_destino == 'new'){

    console.log('Opcion: NEW pago destino. el cliente quiere confirmar el pago? posiblmente');

    $scope.reset();

  }else{

    $scope.getDataPagoDestino();

  }

  console.log('controlador -transaccPagoDestino.init_function.end');

}



  ////*debugger;

  console.log('controlador-transacc/resumen. inicio');

  $scope.init_function();

  console.log('controlador -transacc/resumen- fin');

}]

);

