'use strict';

angular.module('myApp.ciudad', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ciudad/:codigo', {
    templateUrl: 'ciudad/index.html',
    controller: 'ctrlCiudad'
  });
}])

//directiva para hacer autoenfoque en un input especifico
.directive('autoFocus', function($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $timeout(function() {
              // use a timout to foucus outside this digest cycle!
              element[0].focus();
              //use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
            }, 0);
    }
  };
})


/*controlador de modulo ciudad*/
.controller('ctrlCiudad', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  //TODO. eliminar esta variable de todo la app
  //auto-referencia al controlador
  var ctrl = this;
  
  $scope.data = [];

    //TODO. simplificar variables
    $scope.codigo = '';

  //interruptores para mostrar mensajes
  //var mostrarError = false;
  $scope.showError = false;
  $scope.mostrarExito = false;
  $scope.showErrorNotFound = false;
  $scope.showForm = true;

  //captura parametro - codigo de ciudad
  $scope.capturarParametro = function(){
    $scope.codigo = $routeParams.codigo;
    console.log('codigo: ' + $scope.codigo);
    //TODO. validar parametro codigo:
    //que no sea vacio, solo que tenga caracteres validos, longitud, no comience con un nro,etc...
  }


//TOdo. guardar este get dentro de una funcion: show y llamar desde funcion onInit
  //funcion para OBTENER DATOS DE USUARIO
  //devuelve datos del ciudad en formato json

  /*funcion para consultar un registro, busca por el campo login pasado como parametro en el URL*/
  //ejemplo: http://localhost/angular-seed/app/#!/user/gperez
  $scope.showData = function() {
    console.log('controlador -ciudad- function showData - inicio');
    console.log('param codigo: ' +  $scope.codigo);

    $http.get("./ciudad/get.php?codigo=" + $scope.codigo)
    .then(function (response) {
      var ciudad = response.data.records;
      if (ciudad[0] != null){
        $scope.data = ciudad[0];
        $scope.showForm = true;
      }
      else{
        $scope.showForm = false;
        $scope.msg = "Ciudad con codigo: " + $scope.codigo + " no encontrada";
        $scope.showErrorNotFound = true;
      }
    },
    function(data, status) {
      console.error('Error en SERVICIO de consulta de datos: ', status, data);
      $scope.msg = "Error consultando datos";
      $scope.showError = true;
      $scope.showForm = false;
    });   //TODO: gestionar error, cuando no se traigan los datos del usuario, mostrar mensaje en vista
}//show

  //funcion para borrar registro
  $scope.delete = function() {
    //*//*debugger;
    console.log('controlador-ciudad- funcion: delete - inicio');

    $http.delete('./ciudad/delete.php?codigo=' + $scope.codigo, JSON.stringify($scope.data))
    .then(function (response) {
      //*debugger;
      $scope.showErrorNotFound = false;
      if (response.data){
        var data = response.data.records[0];
        if(data.resultado != null)
          if(data.resultado == 'EXITO'){
            $scope.msg = "Registro Borrado con Exito!";
            $scope.mostrarExito = true;
            $scope.showForm = false;
            $scope.showError = false;
          }else if(data.resultado == 'ERROR'){
            $scope.msg = '\n' + data.mensaje;
            $scope.showError = true;
            $scope.mostrarExito = false;
            $scope.showForm = false;
          }
        }
      }, function (response) {
        $scope.msg = "Error en intento de Borrar Data: Service not Exists";
        $scope.statusval = response.status;
        $scope.statustext = response.statusText;
        $scope.headers = response.headers();
        $scope.mostrarError = true;
        $scope.mostrarExito = false;
      });

    console.log('controlador-ciudad- funcion: delete - fin');
  };//delete

  //funcion para grabar datos, sea insertar o actualizar
  $scope.save = function() {
    console.log('controlador-ciudad- funcion: save - inicio');
    var metodo = "";

    //TODO. antes de guardar verificar que hay cambios en el registro
    //sino indicar al usuario que no hay cambios que guardar

  //TODO. validar datos a guardar

  if ($scope.data.id != null && $scope.data.id != "" && $scope.data.id != 0 ){
    metodo = "update";
    $scope.update();
  }else{
   metodo = "insert";
   $scope.insert();
 }
  }//save

  //TODO. arreglar mensajes de error y exito
  //funcion para insertar registro
  $scope.insert = function() {
    console.log('controlador-ciudad- funcion:insert - inicio');
    $http.post('./ciudad/insert.php', JSON.stringify($scope.data))
    .then(function (response) {
      //*debugger;
      $scope.showErrorNotFound = false;
      if (response.data){
        var data = response.data.records[0];
        if(data.resultado != null)
          if(data.resultado == 'EXITO'){
            $scope.msg = "Datos registrados con Exito!";
            $scope.mostrarExito = true;
            $scope.showError = false;
          }else if(data.resultado == 'ERROR'){
            $scope.msg = '\n' + data.mensaje;
            $scope.showError = true;
            $scope.mostrarExito = false;
          }
        }
      }, function (response) {
        $scope.msg = "Error intentando registrar datos: Service not Exists";
        $scope.statusval = response.status;
        $scope.statustext = response.statusText;
          //$scope.headers = response.headers();
          $scope.mostrarError = true;
          $scope.mostrarExito = false;
        });
    console.log('controlador-ciudad- funcion:insert - fin');
  };//insert

//function para actualizar registro
$scope.update = function() {
  console.log('controlador-ciudad- funcion:update - inicio');
  $http.post('./ciudad/update.php', JSON.stringify($scope.data))
  .then(function (response) {
    //*debugger;
    $scope.showErrorNotFound = false;
    if (response.data){
      var data = response.data.records[0];
      if(data.resultado != null)
        if(data.resultado == 'EXITO'){
          $scope.msg = "Datos modificados!";
          $scope.mostrarExito = true;
          $scope.showError = false;
        }else if(data.resultado == 'ERROR'){
          $scope.msg = '\n' + data.mensaje;
          $scope.showError = true;
          $scope.mostrarExito = false;
        }
      }
    }, function (response) {
      $scope.msg = "Error intentando modificar información: Service not Exists";
      $scope.statusval = response.status;
      $scope.statustext = response.statusText;
          //$scope.headers = response.headers();
          $scope.mostrarError = true;
          $scope.mostrarExito = false;
        });
  console.log('controlador-ciudad- funcion:update - fin');
  }//update

//TODO. definir funcion onInit, y llamar a showUser

//reset datos a valores ficticios para crear un nuevo registro
$scope.reset = function() {
  console.log('controlador -ciudad- reset(). inicio');
  //al colocar el id en blanco permite que el modo cambie a 'insert'
  //TODO. aqui se podria colocar el modo directamente en insert
  $scope.master = {id: "", codigo:"", nombre:"", observ:"", cod_moneda:""};
  $scope.data = angular.copy($scope.master);

  //TODO. DESEO. colocar cursor en primer campo
  /**/
  var target = document.getElementById('#codigo');
  //var target = angular.element(codigo);
  console.log('controlador -ciudad- reset(). target = ' + target);
  /**/

  console.log('controlador -ciudad- reset(). fin');
};

//graba el registro actual y reset form para hacer nuevo registro
$scope.saveAndReset = function(){
  $scope.save();
  $scope.reset();
}

/*
//llamada al iniciar controlador, copiado de apps de sudamerisSec
$scope.cargarciudades = function () {
  //+$scope.init_funtion();
  ////*debugger;
  console.log('controlador -ciudad- onInit. inicio');
  $scope.saludo = "Saludo desde el ctrl -ciudad-";

  $scope.capturarParametro();

  if(codigo == 'new'){
    console.log('opcion NEW');
  }else{
    $scope.showData();
  }
}
*/


//carga lista de paises para poblar select, acorde al pais seleccionado
$scope.cargarPaises = function () {
    $http.get("./paises/list_short.php?cod_pais=" + $scope.data.cod_pais)
 .then(function (response) {
  //*//*debugger;
  $scope.lista_paises = response.data.records;
  console.log($scope.lista_paises);
},
function(data, status) {
  //* //*debugger;
  console.error('Error en SERVICIO de consulta de lista paises. ', status, data);
  $scope.msg = "Error consultando datos: SERVICIO de consulta de lista paises";
  $scope.showError = true;
})};



$scope.init_function = function(){
  ////*debugger;
  console.log('controlador -ciudad- init_function. inicio');
  $scope.saludo = "Saludo desde el ctrl -ciudad-. ";

  $scope.lista_monedas=[];
  $scope.cargarPaises();

  $scope.capturarParametro();
  if($scope.codigo == 'new'){
    console.log('opcion NEW');
    $scope.reset();
    $scope.readonly = false;
  }else{
    $scope.showData();
    $scope.readonly = true;
  }
  console.log('controlador -ciudad- init_function. fin');
}

  ////*debugger;
  console.log('controlador-ciudad. inicio');
  $scope.init_function();
  console.log('controlador -ciudad- fin');
}]
);
