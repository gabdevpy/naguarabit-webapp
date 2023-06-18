'use strict';

angular.module('myApp.transacc', ['ngRoute'])

//enrutamiento a list
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/transacc', {
    templateUrl: 'transacc/list.html',
    controller: 'ctrlTransacciones'
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


//TODO. agregar opciones de ordenamiento a columnas
.controller('ctrlTransacciones', ['$scope', '$http', function($scope, $http) {

//variables
  $scope.condicionWhere = '';

//formatear valores de campo date_created
$scope.formatearDateCreated = function (data){
  // Obteniendo todas las claves del JSON
  var json = angular.copy(data);
  for (var clave in json){
    // Controlando que json realmente tenga esa propiedad
    if (json.hasOwnProperty(clave)) {
      // Mostrando en pantalla la clave junto a su valor
      //*-console.log('fecha: ' + json[clave].date_created);
      //*-console.log('fecha formateada: ' + formatDate(json[clave].date_created));
      //se llama a funcion de libreria util/fechas.js
      json[clave].date_created = formatDate(json[clave].date_created);
    }
  }
  return json;
};

/*obtiene lista de TODAS las transacciones registradas*/
//TODO. agregar rango de fechas, puesto que cuando sean muchas se puede ralentizar
$scope.getAllData = function(){
  console.log('controlador -transacciones-getDataAll.inicio');
	   //devuelve lista de transacciones en formato json
    $http.get("./transacc/list.php")
    .then(function (response) {
     $scope.resultados = response.data.records;
     $scope.resultados = $scope.formatearDateCreated($scope.resultados);
   });
    console.log('controlador -transacciones-getData.fin');
  };


  /*establece condiciones para el WHERE del query, segun los filtros elegidos en la vista*/
  $scope.getCondiciones = function(){
    console.log('controlador -transacciones-getCondiciones.inicio');
    var cond = "", c1 = "", c2 = "", c3 = "";
    //TODO. OJO. revisar esta condicion
    /*TODO. activar
    if ($scope.condicionWhere !='' && !$scope.pago1_status && !$scope.pago2_status && $scope.filtros.status == ''){
      //no se aplica filtros, se usa el select original sin filtros
      $scope.condicionWhere = "";
      return;
    }
    */

    if ($scope.filtros.status != ''){
      if ($scope.filtros.status == 'CANC'){
        c1 = "status IN ('CA','CC','CO')"; //tipos de Cancelaciones, estan agrupadas en un solo status: CANCELADA
      }else{
        c1 = "status:'" + $scope.filtros.status + "'";  //se usa el filtro que se ha seleccionado
      }
    }else{
      c1 = "";
    }

     if ($scope.pago1_status && true){
      //c2 = "status:PO&"; //posiblemente agregar combinacion con campo status
      c2 = "status_PO:'OK'"; //pago origen verificado por operador
     }else{
      //TODO. falta filtro de pago origen realizado
        c2 = "(status_PO:'A'.OR.status_PO:'')"; //pago origen pendiente por verificar, o pendiente por parte del cliente
      //c2 = "status_PO:'A'"; //pago origen pendiente
      //SI FUNCIONA
      //c2 = "status_PO:''"; //pago origen pendiente
     }

     debugger;
     if ($scope.pago2_status == true){
       c3 = "status_PD:'A'"; //pago destino realizado
     }else{
       c3 = "status_PD:''";//pago destino pendiente
       //duda: status_PD:'A' o blanco?
     }

    console.log('c1: '+ c1);
    console.log('c2: '+ c2);
    console.log('c3: '+ c3);


    //formar la condicion completa
    cond = c1;
    if ($scope.mostrarFiltroPO ==true){//la interfaz esta mostrando el filtro de PAGO ORIGEN
      cond = (cond=="" ? c2 : cond+".AND."+c2);
    }
    if ($scope.mostrarFiltroPD ==true){//la interfaz esta mostrando el filtro de PAGO DESTINO 
      cond = (cond=="" ? c3 : cond+".AND."+c3);
    }
    //DEBUG
    console.log('condicion string: '+ cond);

    //cond = c1+c2+c3;
    //cond = c1 + c2 + c3;
/**/

    //final: c1 + ".AND." + c2 + ".AND." + c3; pero sin AND para c2 o para c3

/*
    cond = c1; //sin importar si c1 sea blanco o no

    var condB = ""; //union de c2 y c3
    //formar la condicion completa
    if (c2 =""){
      condB = c3;
    }else if (c3 !=""){
      condB = c2 . ".AND." . c2;
    } 

    && c3 !=""){
    }
    if (cond!=""){
    }
    if (c3!=""){
      cond += ".AND." + c3;
    }

    if (cond !=)
    cond = c1 + condB;
*/


/*
    //formar la condicion completa
    if (c1!=""){
      cond += c1 + ".AND." + c2 + ".AND." + c3;
    }else{
      cond += c2 + ".AND." + c3;
    }
*/
  
/*
    //TODO. usar json para almacenar las condiciones como un arreglo, asi no importaria el orden
    cond.c1 = angular.copy(c1);
    cond.c2 = angular.copy(c2);
    cond.c3 = angular.copy(c3);
    console.log('cond json: '+ JSON.stringify($scope.cond));
*/

      /*
      $scope.pago2_status = false;
      $scope.filtros = {status: 'New'};
      */
    console.log('cond: '+ cond);
    console.log('controlador -transacciones-getCondiciones.fin');
    $scope.condicionWhere = cond;
    return cond;
  };

  //function que se llama cuando se selecciona filtro de status 
  //establece que botones de filtros mostrar que son excluyentes 
   $scope.selectedStatus = function(){
      //TODO. evaluar que filtros mostrar en estos casos
      //$scope.filtros.status == ""
      if($scope.filtros.status == 'FIN' || $scope.filtros.status == 'CANC'){
        $scope.mostrarFiltroPO = false;
        $scope.mostrarFiltroPD = false;
        return;
      }
      if($scope.filtros.status == 'New'){
        $scope.mostrarFiltroPO = false;
        $scope.mostrarFiltroPD = false;
        return;
      };
      
      if($scope.filtros.status == 'PO')
        $scope.mostrarFiltroPO = true;
      else
        $scope.mostrarFiltroPO = false;
  
      if($scope.filtros.status == 'PD')
        $scope.mostrarFiltroPD = true;
      else
        $scope.mostrarFiltroPD = false;
   };


//TODO. agregar filtro de login usuario, para usar la lupa del usuario.

  /*inicializa filtros*/
  $scope.initFiltros = function(){
    $scope.filtros = {status: '', cod_pais1: 'PAR', cod_pais2: 'VEN'};
    //TODO. POSIBLE. pasar estas variables al arreglo filtros
    //TODO. estas combinaciones deberian ajustarse, cuando se trate de cada tipo de operador.
    //combinacion para operador destino:
    $scope.pago1_status = false; //filtro pago origen verificado/ o no
    $scope.pago2_status = false; //filtro pago destino realizado/ o pendiente

    /*combinacion para operador origen:
    //$scope.pago1_status = false; //pago origen verificado, para que pueda aparecer algo
    //$scope.pago2_status = false; //pago destino no verificado
    */ 

    //combinacion para superadmin
    $scope.mostrarFiltroPO = true; //mostrar filtro de pago origen
    $scope.mostrarFiltroPD = true; //mostrar filtro de pago destino

    /*combinacion para operador-origen. y nunca
    //$scope.mostrarFiltroPO = true; //mostrar filtro de pago origen
    //$scope.mostrarFiltroPD = false; //nunca mostrar filtro de pago destino
    */

    /*combinacion para operador-destino
    //$scope.mostrarFiltroPO = false; // nunca mostrar filtro de pago origen
    //$scope.mostrarFiltroPD = true; //mostrar filtro de pago destino
    */
    $scope.busq1 = ''; //se limpia filtro caja de busqueda
  };  

  /*obtiene lista de las transacciones, que cumplen con los filtros*/
  $scope.cargarDataFiltrada = function($nroBoton){
   console.log('controlador -transacciones-getDataFiltrada.inicio');

   //cambiar estados de botones
   if($nroBoton == 1){
        $scope.pago1_status = !$scope.pago1_status; 
   }else if($nroBoton == 2){
        $scope.pago2_status = !$scope.pago2_status; 
   }else



   //TODO. simplicar este bloque de codigo.
   $scope.condicionWhere = '';
   $scope.getCondiciones();
   if ($scope.condicionWhere == ''){
    $scope.getAllData();
    return;
   }
  //devuelve lista de transacciones, aplicando filtros
   $http.get("./transacc/list_filtrada.php?filtros=" + $scope.condicionWhere)
       .then(function (response) {
        $scope.resultados = response.data.records;
        $scope.resultados = $scope.formatearDateCreated($scope.resultados);
      });
    console.log('controlador -transacciones-getDataFiltrada.fin');
  };

  $scope.new = function (){
    location.href = '#!/calc/';
  };      



  /*obtiene lista de las transacciones, que cumplen con los filtros*/
  $scope.cargarDataFiltrada = function($nroBoton){
   console.log('controlador -transacciones-getDataFiltrada.inicio');

   //cambiar estados de botones
   if($nroBoton == 1){
        $scope.pago1_status = !$scope.pago1_status; 
   }else if($nroBoton == 2){
        $scope.pago2_status = !$scope.pago2_status; 
   }else



   //TODO. simplicar este bloque de codigo.
   $scope.condicionWhere = '';
   $scope.getCondiciones();
   if ($scope.condicionWhere == ''){
    $scope.getAllData();
    return;
   }
  //devuelve lista de transacciones, aplicando filtros
   $http.get("./transacc/list_filtrada.php?filtros=" + $scope.condicionWhere)
       .then(function (response) {
        $scope.resultados = response.data.records;
        $scope.resultados = $scope.formatearDateCreated($scope.resultados);
      });
    console.log('controlador -transacciones-getDataFiltrada.fin');
  };//cargarDataFiltrada



  /*obtiene lista de las transacciones, que cumplen con los filtros*/
  $scope.listByUser = function($login){
   console.log('controlador -transacciones-listByUser.inicio');

   console.log('login: ' + $login);
   if (!$login || $login === ''){
      //TODO. mostrar mensaje de error en pantalla
      return false;
   }

   //TODO. aqui debe indicarse el id de usuario o login 
   $scope.condicionWhere = "a.login : '" + $login + "'";
   console.log('login: ' + $login);

  //devuelve lista de transacciones, aplicando filtros
   $http.get("./transacc/list_filtrada_user.php?filtros=" + $scope.condicionWhere)
       .then(function (response) {
        $scope.resultados = response.data.records;
        $scope.resultados = $scope.formatearDateCreated($scope.resultados);
      });
    console.log('controlador -transacciones-listByUser.fin');
  };//listByUser


  $scope.new = function (){
    location.href = '#!/calc/';
  };      


  $scope.onInit = function(){
    console.log('controlador -transacciones- inicio');
    $scope.condicionWhere = '';
    $scope.initFiltros();
    $scope.getAllData();
    console.log('controlador -transacciones- fin');
  };

  $scope.onInit();
  //**
  $scope.saludo = "Saludo desde ctrl";

}]);


/*
.controller('ctrlTransaccionResumen', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  $scope.init = function(){
    console.log('controlador -transaccionResumen- inicio');
    console.log('controlador -transaccionResumen- fin');
  }

  $scope.init();
}]);
*/
