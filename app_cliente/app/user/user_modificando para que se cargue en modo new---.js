'use strict';

angular.module('myApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user/:userLogin', {
    templateUrl: 'user/user.html',
    controller: 'ctrlUser'
  });
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

  ctrl.init_funtion = function(){
    console.log('controlador -user- inicio');
    //*debugger;
  //prueba, si funciona
  ctrl.saludo = "Saludo desde el ctrl -user-";
  ctrl.user = null;
  ctrl.paramLogin = null;
  //var mostrarError = false;
  ctrl.showError = false;
  ctrl.mostrarExito = false;
  ctrl.showErrorNotFound = false;
  var param = $routeParams.userLogin;  
  console.log('login: ' + param);
  if(param == 'new'){
    ctrl.reset();
    //-ctrl.resetForNew();
  }else{
    ctrl.paramLogin = param;
    ctrl.show();    
  }
  console.log('controlador -user- init_funcion -inicio');
}


/*funcion para consultar un registro, busca por el campo login pasado como parametro en el URL*/
  //ejemplo: http://localhost/angular-seed/app/#!/user/gperez
  ctrl.show = function() {
    $http.get("./user/get_user.php?login=" + ctrl.paramLogin)
    .then(function (response) {
      var users = response.data.records;
      if (users[0] != null){
        ctrl.user = users[0];
        ctrl.showForm = true;
      }
      else{
        ctrl.showForm = false;
        ctrl.msg = "Usuario con login: " + ctrl.paramLogin + " no encontrado";
        ctrl.showErrorNotFound = true;
      }
    },
    function(data, status) {
      console.error('Error en llamada a busqueda dato de usuario: ', status, data);
      ctrl.msg = "Error consultando datos";
      ctrl.showError = true;
      ctrl.showForm = false;
    });   //TODO: gestionar error, cuando no se traigan los datos del usuario, mostrar mensaje en vista

    /*no funciona bien*/
    /*funcion para reset datos al original*/
   /*
  ctrl.master = angular.copy(ctrl.user);
  ctrl.reset = function() {
    //*debugger;
    console.log('controlador-user- funcion: reset - inicio');
    ctrl.user = angular.copy(ctrl.master);
    console.log('controlador-user- funcion: reset - fin');
  };
  */
}//show

/*funcion para borrar registro*/
ctrl.delete = function() {
    //*//*debugger;
    console.log('controlador-user- funcion: delete - inicio');

    $http.delete('./user/delete_user.php?login=' + ctrl.user.login, JSON.stringify(ctrl.user))
    .then(function (response) {
      //*debugger;
      ctrl.showErrorNotFound = false;
      if (response.data){
        var data = response.data.records[0];
        if(data.resultado != null)
          if(data.resultado == 'EXITO'){
            ctrl.msg = "Registro Borrado con Exito!";
            ctrl.mostrarExito = true;
            ctrl.showForm = false;
            ctrl.showError = false;
          }else if(data.resultado == 'ERROR'){
            ctrl.msg = '\n' + data.mensaje;
            ctrl.showError = true;
            ctrl.mostrarExito = false;
            ctrl.showForm = false;
          }
        }
      }, function (response) {
        ctrl.msg = "Error en intento de Borrar Data: Service not Exists";
        ctrl.statusval = response.status;
        ctrl.statustext = response.statusText;
        ctrl.headers = response.headers();
        ctrl.mostrarError = true;
        ctrl.mostrarExito = false;
      });

    console.log('controlador-user- funcion: delete - fin');
  };//function delete


  /*funcion para insertar/actualizar datos*/
  ctrl.save = function() {
    console.log('controlador-user- funcion: save - inicio');  
    var metodo = "";

    //TODO. antes de guardar verificar que hay cambios en el registro
    //sino indicar al usuario que no hay cambios que guardar

  //TODO. validar datos a guardar
  //login: no puede ser de varias palabras, tiene que ser una sola palabra, comience con nro, solo incluya letras y nros y guion bajo
  //telefono solo nros
  //email
  //longitud de campos

  if (ctrl.user.id != null && ctrl.user.id != "" && ctrl.user.id != 0 ){
    metodo = "update";
    ctrl.update();
  }else{
   metodo = "insert";
   ctrl.insert();
 }

  }//save

  /*funcion para insertar registro*/
  //TODO. arreglar mensajes de error y exito
  ctrl.insert = function() {
    console.log('controlador-user- funcion:insert - inicio');      
    $http.post('./user/insert_user.php', JSON.stringify(ctrl.user))
    .then(function (response) {
      //*debugger;
      ctrl.showErrorNotFound = false;
      if (response.data){
        var data = response.data.records[0];
        if(data.resultado != null)
          if(data.resultado == 'EXITO'){
            ctrl.msg = "Cuenta de usuario registrada con Exito!";
            ctrl.mostrarExito = true;
            ctrl.showError = false;
          }else if(data.resultado == 'ERROR'){
            ctrl.msg = '\n' + data.mensaje;
            ctrl.showError = true;
            ctrl.mostrarExito = false;
          }
        }
      }, function (response) {
        ctrl.msg = "Error al intentar registra Informacion: Service not Exists";
        ctrl.statusval = response.status;
        ctrl.statustext = response.statusText;
          //ctrl.headers = response.headers();
          ctrl.mostrarError = true;
          ctrl.mostrarExito = false;
        });
    console.log('controlador-user- funcion:insert - fin');
  };//insert

  ctrl.update = function() {
    console.log('controlador-user- funcion:update - inicio');      
    $http.post('./user/update_user.php', JSON.stringify(ctrl.user))
    .then(function (response) {
      //*debugger;
      ctrl.showErrorNotFound = false;
      if (response.data){
        var data = response.data.records[0];
        if(data.resultado != null)
          if(data.resultado == 'EXITO'){
            ctrl.msg = "Cuenta de usuario modificada!";
            ctrl.mostrarExito = true;
            ctrl.showError = false;
          }else if(data.resultado == 'ERROR'){
            ctrl.msg = '\n' + data.mensaje;
            ctrl.showError = true;
            ctrl.mostrarExito = false;
          }
        }
      }, function (response) {
        ctrl.msg = "Error al intentar modificar información: Service not Exists";
        ctrl.statusval = response.status;
        ctrl.statustext = response.statusText;
          //ctrl.headers = response.headers();
          ctrl.mostrarError = true;
          ctrl.mostrarExito = false;
        });
    console.log('controlador-user- funcion:update - fin');
  }//update

//TODO. definir metodo onInit, y llamar a showUser


/*reset datos*/
ctrl.reset = function() {
  ctrl.master = {id: "", nombre:"Nombres y Apellidos", login:"nickusuario", 
  email:"user@mail.com", telefono:"+", cod_pais:"", cod_ciudad:""};
  ctrl.user = angular.copy(ctrl.master);
};


ctrl.$onInit = function () {
  ctrl.init_funtion();
}

}]
);
