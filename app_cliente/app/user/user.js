'use strict';

angular.module('myApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user/:userLogin', {
    templateUrl: 'user/index.html',
    controller: 'ctrlUser'
  });
  /*TODO. parece que hay que borrar esto */
  $routeProvider.when('/user/delete/:userLogin', {
    templateUrl: 'user/user.html',
    controller: 'ctrlUserDelete'
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


/*controlador de modulo user*/
.controller('ctrlUser', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  var ctrl = this;
  $scope.user = [];
  //para mostrar mensajes
  $scope.showError = false;
  $scope.mostrarExito = false;
  $scope.showErrorNotFound = false;
  $scope.showForm = true;

  //captura parametro que viene del url - login
  $scope.capturarParametro = function(){
    $scope.login = $routeParams.userLogin;
    console.log('login: ' + $scope.login);
    //TODO. validar parametro login:
    //que no sea vacio, solo que tenga caracteres validos, longitud, no comience con un nro,etc...
  }

  //funcion para OBTENER DATOS DE USUARIO, y los guarda en variable user. en formato json
  $scope.showData = function() {
   $http.get("./user/get_user.php?login=" + $scope.login)
   .then(function (response) {
    var users = response.data.records;
    if (users[0] != null){
      $scope.user = users[0];
      $scope.cargarCiudades();
      $scope.showForm = true;
    }
    else{
      $scope.showForm = false;
      $scope.msg = "Usuario con login: " + $scope.login + " no encontrado";
      $scope.showErrorNotFound = true;
    }
  },
  function(data, status) {
    console.error('Error en llamada a busqueda dato de usuario: ', status, data);
    $scope.msg = "Error consultando datos";
    $scope.showError = true;
    $scope.showForm = false;
    });   //TODO: gestionar error, cuando no se traigan los datos del usuario, mostrar mensaje en vista
 };

 /*funcion para borrar registro*/
 $scope.delete = function() {
    //*//*debugger;
    console.log('controlador-user- funcion: delete - inicio');

    $http.delete('./user/delete_user.php?login=' + $scope.user.login, JSON.stringify($scope.user))
    .then(function (response) {
      //*//*debugger;
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

    console.log('controlador-user- funcion: delete - fin');
  };//function delete


  /*funcion para insertar/actualizar datos*/
  $scope.save = function() {
    console.log('controlador-user- funcion: save - inicio');
    var metodo = "";

    //TODO. antes de guardar verificar que hay cambios en el registro
    //sino indicar al usuario que no hay cambios que guardar

  //TODO. validar datos a guardar
  //login: no puede ser de varias palabras, tiene que ser una sola palabra, comience con nro, solo incluya letras y nros y guion bajo
  //telefono solo nros
  //email
  //longitud de campos

  if ($scope.user.id != null && $scope.user.id != "" && $scope.user.id != 0 ){
    metodo = "update";
    $scope.update();
  }else{
    metodo = "insert";
    $scope.insert();
  }
    console.log('controlador-user- funcion: save - fin');
}//save

  /*funcion para insertar registro*/
  //TODO. arreglar mensajes de error y exito
  $scope.insert = function() {
    console.log('controlador-user- funcion:insert - inicio');
    $http.post('./user/insert_user.php', JSON.stringify($scope.user))
    .then(function (response) {
      //*debugger;
      $scope.showErrorNotFound = false;
      if (response.data){
        var data = response.data.records[0];
        if(data.resultado != null)
          if(data.resultado == 'EXITO'){
            $scope.msg = "Cuenta de usuario registrada con Exito!";
            $scope.mostrarExito = true;
            $scope.showError = false;
          }else if(data.resultado == 'ERROR'){
            $scope.msg = '\n' + data.mensaje;
            $scope.showError = true;
            $scope.mostrarExito = false;
          }
        }
      }, function (response) {
        $scope.msg = "Error al intentar registra Informacion: Service not Exists";
        $scope.statusval = response.status;
        $scope.statustext = response.statusText;
          //$scope.headers = response.headers();
          $scope.mostrarError = true;
          $scope.mostrarExito = false;
        });
    console.log('controlador-user- funcion:insert - fin');
  };//insert

  $scope.update = function() {
    console.log('controlador-user- funcion:update - inicio');
    $http.post('./user/update_user.php', JSON.stringify($scope.user))
    .then(function (response) {
      //*debugger;
      $scope.showErrorNotFound = false;
      if (response.data){
        var data = response.data.records[0];
        if(data.resultado != null)
          if(data.resultado == 'EXITO'){
            $scope.msg = "Cuenta de usuario modificada!";
            $scope.mostrarExito = true;
            $scope.showError = false;
          }else if(data.resultado == 'ERROR'){
            $scope.msg = '\n' + data.mensaje;
            $scope.showError = true;
            $scope.mostrarExito = false;
          }
        }
      }, function (response) {
        $scope.msg = "Error al intentar modificar información: Service not Exists";
        $scope.statusval = response.status;
        $scope.statustext = response.statusText;
          //$scope.headers = response.headers();
          $scope.mostrarError = true;
          $scope.mostrarExito = false;
        });
    console.log('controlador-user- funcion:update - fin');
  }//update


//carga lista de paises para poblar select
$scope.cargarPaises = function () {
 $http.get("./paises/list_short.php")
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


//carga lista de paises para poblar en campo -select-
$scope.cargarCiudades = function () {
  console.log('controlador:user. funcion cargarCiudades. start');
  console.log('$scope.user.cod_pais:' + $scope.user.cod_pais);
  $http.get("./ciudad/list_short.php?cod_pais=" + $scope.user.cod_pais)
  .then(function (response) {
    $scope.lista_ciudades = response.data.records;
    console.log($scope.lista_ciudades);
  },
  function(data, status) {
    console.error('Error en SERVICIO de consulta de lista ciudades. ', status, data);
    $scope.msg = "Error consultando datos: SERVICIO de consulta de lista ciudades";
  })
  console.log('controlador -user- cargarCiudades. end');
};


//cuando cambia el pais en el select, carga lista de ciudad del pais seleccionado
$scope.changedPais = function () {
  console.log('controlador -user- changedPais. start');
  if ($scope.user.cod_pais=="")
  {
    $scope.user.cod_ciudad="";
  }
  else{
    $scope.cargarCiudades();
  }
  console.log('controlador -user- changedPais. end');
}

/*reset datos*/
$scope.reset = function() {
  $scope.master = {id: "", nombre:"Nombres y Apellidos", login:"nickusuario",
  email:"user@mail.com", telefono:"+", cod_pais:"", cod_ciudad:""};
  $scope.user = angular.copy($scope.master);
};

$scope.saveAndReset = function(){
  $scope.save();
  $scope.reset();
}

//funcion que se llama al inicio
$scope.init_function = function(){
  console.log('controlador -user- init_function. start');
  //-$scope.saludo = "Saludo desde el ctrl -user-. ";

  $scope.cargarPaises();

  $scope.capturarParametro();
  if($scope.login == 'new'){
    console.log('Opcion: NEW');
    $scope.reset();
    $scope.readonly = false;
  }else{
    $scope.readonly = true;
    $scope.showData();
    //-$scope.cargarCiudades();
  }
  console.log('controlador -user- init_function. end');
}

  ////*debugger;
  console.log('controlador-user. inicio');
  $scope.init_function();
  console.log('controlador -user- fin');
}]
);
