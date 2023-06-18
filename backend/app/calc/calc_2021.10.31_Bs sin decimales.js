//controlador asociado a template de calc/calculo.html



//DATOS

//monto1: origen

//monto2: destino

//monto3: dólares



//TAREAS POR COMPLETAR

//calcular comision en USD, y guardar en la transaccion

//calcular comision en moneda origen> Gs, y guardar en la transaccion



'use strict';



angular.module('myApp.calc', ['ngRoute']) //TODO. test: ,'ngStorage'



//ejemplo de ruta: http://localhost/naguarabit/app/#!/calc/

.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/calc', {

    templateUrl: 'calc/index.html',

    controller: 'ctrlCalc'

  });

}])



//ejemplo de ruta: http://localhost/naguarabit/app/#!/calc/

.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/calc/:userLogin', {

    templateUrl: 'calc/index.html',

    controller: 'ctrlCalc'

  });

}])



//TODO. finalizar

//ejemplo: http://localhost/naguarabit/app/?#!/calc/1

//el 1 puede ser nro de transacción, o modo de pago

//valores posibles de modo: CALC, PAGO

/*

.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/calc/:modo', {

    templateUrl: 'calc/pago.html',

    controller: 'ctrlCalcPago'

  });

}])

*/







/*TODO.

Completar y probar. se usara para cuando el usuario tenga una remesa activa, 

1. mostrar la opcion para adjuntar ese pago.

Si el usuario paga, se cambia el estatus de la transaccion.



2. adicionalmente el usuario puede cancelar la transaccion actual, por x causa, debe indicar el motivo.



3. en la version1, el usuario no podra iniciar una transaccion siguiente, si no ha pagado todavia,

pero si podra ver la pagina de calculo. *esto solo implica deshabilitar el boton "iniciar remesa"

*/

//ejemplo: http://localhost/naguarabit/app/?#!/calc/1

//el 1 puede ser nro de transacción, o modo de pago

//valores posibles de modo: CALC, PAGO

/*

.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/calc/:modopago', {

    templateUrl: 'calc/pago.html',

    controller: 'ctrlCalcPago'

  });

}])

*/







/*prueba de directiva state para guardar y pasar variables entre los controllers

.state('calc_chat', {

        url: '/employees/employeeDetails/:employeeId/:icon/:iconAlt/:title/:firstName/:lastName/:dateOfBirth/:niNumber/:jobTitle/:department/:joinDate/:leaveDate/:email/:phonePrimary/:phoneSecondary/:employeePayments',

        templateUrl: 'pages/employees/employeeDetails.html',

        params: {

            employeeId: null,

            icon: null,

            iconAlt: null,

            title: null,

            firstName: null,

            lastName: null,

            dateOfBirth: null,

            niNumber: null,

            jobTitle: null,

            department: null,

            joinDate: null,

            leaveDate: null,

            email: null,

            phonePrimary: null,

            phoneSecondary: null,

            employeePayments: null

        },

        controller: 'employeeDetailsController'

    })

*/



//directiva para auto-focus de un input

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







//directiva para manejo de input tipo monto, permite mostrar punto como separador de miles, cuando se está escribiendo en el input

.directive('blurToCurrency', function($filter){

  return {

    scope: {

      amount  : '='

    },

    link: function(scope, el, attrs){

      el.val($filter('comma2decimal')($filter('currency')(scope.amount, "", 0)));



      el.bind('focus', function(){

        el.val(scope.amount);

      });



      el.bind('input', function(){

        scope.amount = el.val();

        scope.$apply();

      });

      el.bind('change', function(){

        el.val($filter('comma2decimal')($filter('currency')(scope.amount, "", 0)));

        $('.monto_format').each(function(i, obj) {

          $(obj).val($filter('comma2decimal')($filter('currency')($(obj).val().replace(/\./g, ''), "", 0)));

        });

      });



      el.bind('blur', function(){

        el.val($filter('comma2decimal')($filter('currency')(scope.amount, "", 0)));

      });

    }

  }

})







//filtro para mostrar el separador decimal de un monto con coma

.filter('comma2decimal', [

  function() {

    return function(input) {

      var ret=(input)?input.toString().replace(/,/g, "."):null;

      return ret;

    };

  }

  ])









//CtrlCal usado en version1.

//ctrl que maneja los datos de calculadora, o sea la solicitud de remesa

//esta version no tiene asociado el login del usuario

//ejemplo de ruta: http://localhost/naguarabit/app/#!/calc/

.controller('ctrlCalc', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {



//NOT USED:

//prueba de funcion a usar con directiva state para guardar y pasar variables entre los controllers

//funtion to convert and object in a URL query string

//only it's useful for flat objets (objetos de 1 sólo nivel, no anidados)

//taken from:

//https://stackoverflow.com/questions/14525178/is-there-any-native-function-to-convert-json-to-url-parameters

function obj_to_query(obj) {

    var parts = [];

    for (var key in obj) {

        if (obj.hasOwnProperty(key)) {

            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));

        }

    }

    return "?" + parts.join('&');

}  







  //carga lista de paises para poblar el select

  $scope.cargarPaises = function () {

    console.log('controlador:calc. funcion: cargarPaises. start');

    $http.get("./paises/list_short.php")

    .then(function (response) {

      $scope.lista_paises = response.data.records;

      console.log($scope.lista_paises);

    },

    function(data, status) {

      console.error('Error en SERVICIO de consulta de cargar lista Paises. ', status, data);

      $scope.msg = "Error consultando datos: SERVICIO de consulta de cargar lista Paises";

    })

    console.log('controlador:calc. funcion: cargarPaises. end');

  };







//carga lista de bancos para pais destino

$scope.cargarBancosDestino = function () {

  console.log('controlador -calc- cargarBancosDestino. inicio');

  var codpaisDestino = $scope.data.cod_pais2;

  /*en proceso. considerar cualquier pais

  $http.get("./bancos/list_short.php?codpais=" + codpaisDestino)

  */

  

  //solo venezuela

  $http.get("./bancos/list_short_vzla.php?codigo=" + codpaisDestino)

  .then(function (response) {

    $scope.lista_bancos = response.data.records;

    console.log($scope.lista_bancos);

  },

  function(data, status) {

    console.error('Error en SERVICIO consulta lista_bancos. ', status, data);

    $scope.msg = "Error consultando datos: SERVICIO de consulta de lista_bancos";

  });

  console.log('controlador -calc- cargarBancosDestino. fin');

}







//carga lista de formas de pago para poblar el select de forma pago en origen

//bancos, giros, WU, etc.

$scope.cargarBancosOrigen = function () {

  console.log('controlador -calc- cargarBancosOrigen. inicio');

  var codpaisOrigen = $scope.data.cod_pais1;

  $http.get("./bancos/list_short_origen.php?codpais=" + codpaisOrigen)

  .then(function (response) {

    $scope.lista_pagos_origen = response.data.records;

    console.log($scope.lista_pagos_origen);

  },

  function(data, status) {

    console.error('Error en SERVICIO consulta lista_pagos_origen. ', status, data);

    $scope.msg = "Error consultando datos: SERVICIO de consulta de lista_pagos_origen";

  });

  console.log('controlador -calc- cargarBancosDestino. fin');

}







//EN PROGRESO: TODO. USAR funcion

//trae info de la API Yadio, con tasas promedio

//guarda en la variable data

$scope.getDataYadio = function() {

  console.log('CtrlAPI.getDataYadio.inicio');

  $scope.cargandotasas=true;



  var URLconsulta = "./simulador/api1_get.php";

    $http.get(URLconsulta)

    .then(function(response) {

      if (response.data.records != null){

        $scope.dataYadio = response.data.records;

        //bloques de datos

        $scope.VES = $scope.dataYadio[0]['VES'];

        $scope.BTC = $scope.dataYadio[0]['BTC'];

        $scope.USD = $scope.dataYadio[0]['USD'];



    //valores particulares, tasas especificas

    //valor de BTC en USD

    $scope.BTC_USD_price = $scope.BTC['price'];

    //precio venta de 1 BTC por Bs

    $scope.BTC_VES_sell = $scope.VES['sell']; 

    //Tasa de Bs por USD

    $scope.USD_VES_rate = $scope.USD['rate'];

    //Tasa de Guaranies por USD (USD/Gs)

    $scope.USD_PYG = $scope.USD['PYG'];



    //Tasa de 1 $USD en Bs. (en operaciones de venta).

    $scope.USD_VES_sell = $scope.BTC_VES_sell / $scope.BTC_USD_price;





    console.log('Consultando data de API Yadio...');

    console.log('BTC/USD: ' + $scope.BTC_USD_price);

    console.log('USD/Bs : ' + $scope.USD_VES_rate);

    console.log('BTC/Bs : ' + $scope.BTC_VES_sell);

    console.log('USD/PYG : ' + $scope.USD_PYG);



    $scope.dataOk = true;

    $scope.getDataYadioMonedaPYG();

  }

  else{

    $scope.msg = "Data en API no encontrada. URL de busqueda: " + URLconsulta;

  }

},

function(data, status) {

      console.error('Error en SERVICIO de consulta de datos: ', status, data);

    });   //TODO: gestionar error, cuando no se traigan los datos del usuario, mostrar mensaje en vista

    console.log('CtrlAPI.getDataYadio.fin');

};//getDataYadio







//obtiene info de API Yadio para una moneda especifica, en este caso el guarani de PARAGUAY (PYG)

//y la guarda en la variable data3

$scope.getDataYadioMonedaPYG = function() {

  console.log('Ctrlsimulador.getDataYadioMonedaPYG.inicio (moneda: PYG)');



    //TODO. especificar moneda a la URL, por ahora es solo PYG

    var URLconsulta = "./simulador/api_yadio_get_moneda.php";

    $http.get(URLconsulta)

    .then(function(response) {

      if (response.data.records != null){

        $scope.data3 = response.data.records;

        //console.log('Ctrlsimulador.getDataYadioMonedaPYG.inicio. moneda: PEN. respuesta api:');

        console.log(response.data)

        //valores particulares, tasas especificas

        $scope.PYG_VES = $scope.data3[0]['rate'];     //bs por guarani, tasa promedio

        $scope.USD_PYG_rate = $scope.data3[0]['usd']; //guaranies por dolar, tasa promedio

        

        console.log('Ctrlsimulador.data:');

        console.log('PYG_VES: '+$scope.PYG_VES);

        console.log('USD_PYG_rate: '+$scope.USD_PYG_rate);



        //analizar si es necesario esta variable

        //$scope.dataOk = $scope.dataOk && true;



        $scope.aplicarComisionTasas();



        //TODO. usar para mostrar mensaje cuando se estan cargando las tasas

        $scope.cargandotasas=false;



      }

      else{

        $scope.msg = "Data  no encontrada. URL de busqueda: " + URLconsulta;

      }

    },

    function(data, status) {

      //debugger;

      console.error('Error en SERVICIO de consulta de datos: ', status, data);

    });   //TODO: gestionar error, cuando no se traigan los datos del usuario, mostrar mensaje en vista

    console.log('Ctrlsimulador.getDataYadioMonedaPYG.fin');

};//getDataYadioMonedaPYG







//setea datos por defecto

$scope.initData = function() {

   //TODO. traer valores del api



   //valores de compra/venta dolar usando BTC

   var limites_montos_Gs = {min:65000, max:1300000}; //de 5 a 200 dolares {min:18000, max:3000000};

   var limites_montos_Bs = {min:110000, max:2000000};



  //TODO. traer valores de la bd o de la sesion del usuario

  //valores del par pais origen y pais destino

  $scope.main = {id:"",

    nombre_pais1:"Paraguay",  cod_pais1:"PAR", cod_moneda1:"PYG",  simbolo_moneda1:"Gs.",  nombre_plural_moneda1:"Guaraníes", monto1: limites_montos_Gs['min'],

    nombre_pais2:"Venezuela", cod_pais2:"VEN", cod_moneda2:"VES" , simbolo_moneda2:"Bs.",  nombre_plural_moneda2:"Bolívares", monto2: limites_montos_Bs['min']

  };

  $scope.data = angular.copy($scope.main);

  //SOLO PARA PRUEBAS de SAVE->UPDATE

  //$scope.data.id_transaccion = 1;



  //set monto dolares inicial

  //1$USD

  $scope.data.monto3 = 10.00;



  //datos destino/beneficiario

  $scope.destino={observ:''};



  //observaciones del usuario

  $scope.user={observ:''};



  //TODO. sacar la variable formapago del arreglo, usar variable simple

  //forma de pago Deposito Bancario

  /*

  $scope.origen={observ:'',formapago:'BITAU', nombrebank:'Itaú', nrocuenta:'12345678901234567890', nombretitular:'Dina Osma', doctitular:'1234567',

  comprobantePago:''};

  /**/



  $scope.origen={observ:'',formapago:'', nombrebank:'', nrocuenta:'', nombretitular:'', doctitular:'',

  comprobantePago:''};



  //TODO. pasar estos datos a la bd, y traer con query

  //forma de pago GIRO

  //$scope.origen.giro={observ:'',nrotlf: '+595-889-5343434', nombretitular:'Dina Osma', doctitular:'8594651'};



  //TODO. pasar estos datos a la bd, y traer con query

  //forma de pago: WU

  //$scope.origen.wu={observ:'', nombretitular:'', doctitular:''};

  //$scope.origen.wu={observ:'', nombretitular:'Dina Osma', doctitular:'8594651'};



  console.log('data inicial: ');

  console.log($scope.data);

};//initData







  //establece valores para forma de pago en origen

  $scope.setResumenOrigen = function() {

    var formaPago = $scope.origen.formapago;

    var resumen = '';

    $scope.origenResumen = '';

    console.log('forma de pago: ' + formaPago);

    console.log('1era letra de forma de pago: ' + formaPago.charAt(0));



    if (!formaPago || formaPago.charAt(0) == '') return null;



    //TODO. terminar. AHORA. ENPROGRESO

    $scope.datosPagoOrigen        = {};

    //$scope.datosPagoOrigen        = $scope.getDatosBanco(formaPago);

    console.log('codigo de forma de pago: ' + formaPago.toUpperCase());

    $http.get("./bancos/get.php?codigo=" + formaPago)

    .then(function (response) {

      $scope.datosPagoOrigen = response.data.records[0];

      console.log('datos de forma de pago:');

      console.log($scope.datosPagoOrigen);

      if (!$scope.datosPagoOrigen || $scope.datosPagoOrigen.length <=0){

        $scope.showData = false;

        return false;

      }

      $scope.showData = true;



      $scope.origen.id_formapago = $scope.datosPagoOrigen.id;

      console.log('id_formapago: ' + $scope.origen.id_formapago);



      $scope.origen.nombrebank     = $scope.datosPagoOrigen.nombrebank;

      $scope.origen.nrocuenta      = $scope.datosPagoOrigen.nrocuenta;

      $scope.origen.tipocuenta     = $scope.datosPagoOrigen.tipocuenta;

      $scope.origen.tipocuenta_desc = $scope.datosPagoOrigen.tipocuenta_desc;

      $scope.origen.nombretitular  = $scope.datosPagoOrigen.nombretitular;

      $scope.origen.doctitular     = $scope.datosPagoOrigen.doctitular;

      $scope.origen.observ         = $scope.datosPagoOrigen.observ;

      $scope.origen.descripcion    = $scope.datosPagoOrigen.descripcion;

      $scope.origenResumen         = $scope.datosPagoOrigen.descripcion;

      //resumen                      = $scope.datosPagoOrigen.descripcion;



    if (formaPago.charAt(0) == 'B'){ //banco

      //console.log('Forma de pago es banco. Hay que mostrar resumen y todos los datos del banco');



      /*version anterior: mostrar resumen con campos separados:*/

      resumen += '' + $scope.origen.nombrebank + '\n';

      resumen += '' + $scope.datosPagoOrigen.tipocuenta_desc + ' N° ' + $scope.datosPagoOrigen.nrocuenta + '\n';

      //resumen += 'Número de cuenta:  ' + $scope.datosPagoOrigen.nrocuenta + '\n';

      //resumen += 'Tipo de cuenta:  '   + $scope.datosPagoOrigen.tipocuenta_desc + '\n';

      resumen += 'Titular: ' + $scope.datosPagoOrigen.nombretitular + '\n';

      resumen += 'Documento: ' + $scope.datosPagoOrigen.doctitular;

      /**/

    } else if (formaPago.charAt(0) =='G'){ //giro

      //console.log('Forma de pago es giro');

      resumen += 'Número Teléfono:   ' + $scope.datosPagoOrigen.nrotlf + '\n';

      resumen += 'Nombre:    ' + $scope.datosPagoOrigen.nombretitular + '\n';

      resumen += 'Documento: ' + $scope.datosPagoOrigen.doctitular;

    } else if (formaPago=='WU'){//western union

      //console.log('Forma de pago es Western Union');

      resumen += 'Western Union \n';

      resumen += 'Nombre Completo:    ' + $scope.datosPagoOrigen.nombretitular + '\n';

      resumen += 'Cédula/Pasaporte: '   + $scope.datosPagoOrigen.doctitular + '\n';

      //resumen += 'Ciudad: '             + $scope.datosPagoOrigen.ciudad;

    }

    

    $scope.origenResumen = resumen;

    console.log('origenResumen: ' + $scope.datosPagoOrigen.descripcion);



  },

  function(data, status) {

    console.error('Error en SERVICIO consulta bancos/get. ', status, data);

    $scope.msg = "Error consultando datos: SERVICIO de consulta de get_banco_detalles";

  });







    







  };





/*

//TODO. AHORA. pasar contenido de esta funcion a donde ahora se está llamando

//Obtener datos de un banco o forma de pago en particular

$scope.getDatosBanco = function(codFormaPago){

  console.log('controlador -calc - getDatosBanco. inicio');

  console.log('codigo de forma de pago: ' + codFormaPago.toUpperCase());

  $scope.datos_banco={};

  $http.get("./bancos/get.php?codigo=" + codFormaPago)

  .then(function (response) {

    $scope.datos_banco = response.data.records;

    console.log('datos de forma de pago:');

    console.log($scope.datos_banco);

    //', nombrebank:'Itau', nombre_largo:nombre_largo, nombretitular:'Dina Osma', doctitular:'1234567', comprobantePago:''};

    //



  },

  function(data, status) {

    console.error('Error en SERVICIO consulta bancos/get. ', status, data);

    $scope.msg = "Error consultando datos: SERVICIO de consulta de get_banco_detalles";

  });

  console.log('controlador -calc- getDatosBanco. fin');  

  return $scope.datos_banco;

};//getDatosBanco

/**/





//TODO.usar query de la bd

//obtiene nombre de pais, proporcionando su codigo

//usar variable lista_paises

$scope.getNombrePais = function() {

  var paises = {PAR:'Paraguay', VEN:'Venezuela', URU:'Uruguay', ARG: Argentina};

  var nombrePais1 = paises[$scope.data.cod_pais1]; //pais elegido en el select-list

}





//TODO. quitar uso de esta funcion al inicio de cargar la calculadora

//TODO. debe obtener lista de  tasas de cambio entre monedas mediante API's o consultas en BD

//igual al usado en el controlador de simulador

$scope.setTasasCambio = function() {

    //$scope.factoresCambio = {{'GS','BS', 2}}; //enprogreso con funciones que usan api

    $scope.tasas_cambio_dolar = {

      //valor en Gs, al comprar BTC, equivalente a 1 dolar





      //v1. tasas fijas, ya no son usadas

      Gs_BTC_compra: 6500, //6472.06 tasa cuando comence a programar este modulo, usando btc





      //v1. tasas fijas, ya no son usadas

      //valor en Bs, por vender el equivalente de 1 dolar, usando BTC

      BTC_Bs_venta: 130973 //ref localbitcoin usano api de yadio (dollartoday?)

      //2020-04-11

       //13009.55 //octubre2019

       //10658.55 tasa cuando comence a programar este modulo, usando btc



      ///TODO. idea. aqui guardar las tasas con comision, para usarlas

     };

   };







//calcula monto2 basado en monto1 y en tasas de cambio

//segun la formula

//monto2 = monto1 / (valor de 1$ en Gs "a la compra") * (Valor de 1$ en Bs "a la venta")

//siendo:

//monto1: monto en pais de origen

//monto2: monto en pais de destino

//TODO. usar tasa de Gs. a la compra

//TODO. usar tasa de Bs. a la venta

$scope.calcular2_A = function() {

 //v1. tasas estaticas irreales

 //var monto2= $scope.data.monto1 / $scope.tasas_cambio_dolar['Gs_BTC_compra'] * $scope.tasas_cambio_dolar['BTC_Bs_venta'];



 //v2. tasas del API con comision

 var monto2= $scope.data.monto1 / $scope.tasa_USD_PYG_final * $scope.tasa_USD_Bs_final;



 //aplicar round sin decimales. $filter('number')(monto2, 0);

 //$scope.data.monto2 = parseInt(monto2.toFixed(0)); //redondeo a 2 decimales
 $scope.data.monto2 = parseInt(monto2); //sin redondeo para evitar imprecisiones en calculo



 console.log('controlador:calc. monto1=' + $scope.data.monto1);

 console.log('controlador:calc. monto2='+$scope.data.monto2);



 //TODO. solo usar esta funcion, dejar de usar todo lo anterior de esta funcion

 //calcularMontoDestinoconComision();

};







//calcula monto origen, basado en monto en dolares

//es decir: calcula monto1 basado en monto2 y en tasas de cambio, segun la formula

//monto1 = monto2 * (valor de 1$ en Gs "a la compra")

//siendo:

//monto1: monto en pais de origen

//monto2: monto en pais de destino

$scope.calcular1_A = function() {

  //v1, usando tasas estaticas irreales

  //var monto1 = $scope.data.monto2 * $scope.tasas_cambio_dolar['Gs_BTC_compra'] / $scope.tasas_cambio_dolar['BTC_Bs_venta'];



  //v2, uso tasas con comision

  //TODO. usar tasa de USD_PYG_compra

  //TODO. usar tasa de USD_Bs_venta

  var monto1 = $scope.data.monto1 * $scope.tasa_USD_PYG_final / $scope.tasa_USD_Bs_final;

  $scope.data.monto1 = parseInt(monto1.toFixed(0));

  console.log('controlador:calc. monto1='+$scope.data.monto1);

};





//calcula monto en USD, basado en monto origen

//esto es: calcula monto3 basado en monto1

//monto3 = monto1 / (valor de 1$ comprado con moneda de origen)

//TODO. aplicar comisión

$scope.calcular3_A = function() {

 $scope.data.monto3 = 0;

 if (!$scope.data.monto1 || $scope.data.monto1 == 0 || $scope.data.monto1 == "") return;



 //v1

 //var monto3= $scope.data.monto1 / $scope.tasas_cambio_dolar['Gs_BTC_compra'];

 //v2

 var monto3= $scope.data.monto1 / $scope.tasa_USD_PYG_final;

 console.log('calc. calcular3_A. monto USD. antes de format =' + monto3);



 $scope.data.monto3 = parseFloat(monto3).toFixed(2);

 console.log('calc. calcular3_A. monto USD=' + $scope.data.monto3);

 //redondeo a 2 decimales. $filter('number')(monto2, 2);

};





//calcula monto3 basado en monto2

//esto es: calcula monto en USD, basado en monto origen

//monto3 = monto2 / (Valor de 1$ en Bs "a la venta")

$scope.calcular3_B = function() {

 console.log('calc. calcular3_B. inicio');

 console.log('monto2=' + $scope.data.monto2);



 $scope.data.monto3 = 0;

 //validacion

 if (!$scope.data.monto2 || $scope.data.monto2 == 0 || $scope.data.monto2 == "") return;



 var monto3 = $scope.data.monto2 / $scope.tasa_USD_Bs_final;

 console.log('calc. calcular3_B. monto3 antesde format =' + monto3);

 $scope.data.monto3 = parseFloat(monto3).toFixed(2); //redondeo a 2 decimales

 //$filter('number')(monto2, 2);

 console.log('calc. calcular3_B. monto3=' + $scope.data.monto3);

};







//calcula monto origen y monto destino basado en monto en USD

//es decir> calcula monto origen (monto1) y monto destino (monto2) basado en monto dólares (monto3)

//monto1 = monto3 * (Valor de 1$ en Gs. "a la compra")

//monto2 = monto3 * (Valor de 1$ en Bs. "a la venta")

//TODO. debo aplicar tasa a la compra en formula 1

//TODO. debo aplicar tasa a la venta en formula 2

$scope.calcularConBaseUSD = function() {

 console.log('calc. calcularEnBaseUSD. start');

 console.log('monto3-dolares=' + $scope.data.monto3);



 $scope.data.monto1 = 0;

 $scope.data.monto2 = 0;



 //TODO. validar mejor el valor de monto3

 //valida el valor de monto3

 if (!$scope.data.monto3 || $scope.data.monto3 == 0) return;

 //$scope.data.monto3 = $scope.data.monto3.trim();



 //v1. con tasas fijas de cuando inicié la programación

 //var monto1 = $scope.data.monto3 * $scope.tasas_cambio_dolar['Gs_BTC_compra'];

 //TODO. formula1

 var monto1 = $scope.data.monto3 * $scope.tasa_USD_PYG_final;

 $scope.data.monto1 = parseInt(monto1.toFixed(0)); //sin decimales



 //TODO. monto2 debe tener 2 decimales

 var monto2 = ($scope.data.monto3 * $scope.tasa_USD_Bs_final);

 //$scope.data.monto2 = parseInt(monto2.toFixed(2)) ; //2 decimales
 $scope.data.monto2 = parseFloat(monto2.toFixed(1)); //redondeo a 1 decimal


 console.log('calc. calcularEnBaseUSD. monto1 (origen)=' + $scope.data.monto1);

 console.log('calc. tasa_USD_Bs_final. tasa_USD_Bs_final=' + $scope.tasa_USD_Bs_final);

 console.log('calc. calcularEnBaseUSD. monto2=' + $scope.data.monto2);

 console.log('calc. calcularEnBaseUSD. end');

};







//decrementa variable paso, para que vista cambia a paso previo

$scope.goBack = function (){

  if ($scope.paso == 4){ //truco, para saltar el paso 3

    $scope.paso -= 2;

  }else{

    $scope.paso -= 1;

  }

  var prog = $scope.paso;

  actualizar_barraProgreso(prog);

  /*

  var xprogreso = document.getElementById("progreso_pasos");

  xprogreso.setAttribute("value", "" + ($scope.paso* 20) );

  */

};



/*

incrementa variable 'paso', para que muestre formulario de paso siguiente

además en los siguiente pasos llama a función para grabar datos

paso 2: graba la solicitud de remesa, con datos hasta ese momento: montos, monedas, forma elegida de pago en origen

paso 3: graba el comprobante (o los comprobantes de pago)

paso 4: llama a función que graba los datos del beneficiario 

*/

$scope.goNext = function (){

  //debugger;

  if ($scope.paso == 1){

    $scope.transaccion = {};

  }

  if ($scope.paso == 2){

    $scope.confirm();

    $scope.paso += 2;//truco, para saltar el paso 3

  }else{ //TODO. debería ser >=2

    $scope.confirm();

    $scope.paso += 1;

  }

  

  //solicitud remesa culminada, redirigir al chat

  if ($scope.paso == 5){

    $scope.chat();

  }



  actualizar_barraProgreso($scope.paso);

};



//abre vista chat

//LISTO. fase1. asociar id de transacción

//X. TODO.  fase2. asociar todos los datos de la transacción generada

//TODO.  fase3. no pasar los datos aquí, sino sólo el id transacción

//y buscar via query's los datos guardados

$scope.chat = function (){

  location.href = '#!/chat/' + $scope.data.id_transaccion;

  //TODO. agregar a la ruta el id de la transacción

}; 









//actualiza barra de progreso, de acuerdo al paso actual

function actualizar_barraProgreso(prog){

  var xprogreso = document.getElementById("progreso_pasos");

  console.log("xprogreso: " + xprogreso);

  //console.log("paso: " + $scope.paso);

  console.log("Progreso Paso/Valor: " + prog);

  xprogreso.setAttribute("value", "" + prog);

  //Para llevar a escala de 100.

  //TODO. quitar multip, dejar unidad

  //xprogreso.setAttribute("value", "" + prog * 20);

}





//confirmar, grabar data en cada paso

$scope.confirm = function() {

  $scope.dataSave = $scope.armarDataParaGuardar();

  $scope.save();



  //TODO. idea/duda.

  //si se está en el paso 2, se hace el insert, y se debe agregar al url el id de la transacción?



  //TODO. enviar correo de notificacion al usuario, y al operador

  //cuando se complete el último paso

};





//setea valores de data para guardar

$scope.armarDataParaGuardar = function() {

  var dataSave = $scope.data;

  dataSave.user = $scope.user;

  dataSave.origen = $scope.origen;

  dataSave.destino = $scope.destino;

  //dataSave.tasa_origen = $scope.tasas_cambio_dolar['Gs_BTC_compra'];

  //dataSave.tasa_destino = $scope.tasas_cambio_dolar['BTC_Bs_venta'];

  dataSave.tasa_origen = $scope.tasa_USD_PYG_final;

  dataSave.tasa_destino = $scope.tasa_USD_Bs_final;

  dataSave.monto_dolares = $scope.data.monto3;

  dataSave.paso = $scope.paso;



  //*

  console.log('$scope.dataSave: ');

  console.log(JSON.stringify(dataSave));

  

  //se debe construir un json con queryURL con el objeto dataSave para pasar como parámetro al componente 'chat'

  //o se guarda en la sesión del navegador

  let u = new URLSearchParams(dataSave).toString();

  console.log('$scope.dataSave #2: ');

  console.log(u);



  return dataSave;

};



//grabar data

$scope.save = function() {

  console.log('controlador -calc- funcion: save -inicio');

  var metodo = "";



  //TODO. validar datos a guardar. todos los campos

  console.log('id_transaccion: ' + $scope.data.id_transaccion);



  if ($scope.data.id_transaccion != null && $scope.data.id_transaccion != "" && $scope.data.id_transaccion != 0 ){

    //TODO. ahora: actualizar transacción con datos de pasos 3,4,5

    metodo = "update transaccion, paso: " + $scope.paso;

    console.log('metodo: ' + metodo);

    /*

    if ($scope.paso == 3){

      //$scope.updateTransaccionComprobantes();

    }

    else*/

    if ($scope.paso == 4){//antes era 4, ahora debe ser 3

      console.info('paso es 4. aqui debe grabar datos del beneficiario')

      $scope.updateTransaccionBeneficiarios();

    }

    else if ($scope.paso == 5){//redirigir al CHAT de la remesa

      //$scope.updateTransaccionUsuario();

      console.info('paso es 5. aqui debe redirir al chat')

    }

  }else{

    metodo = "insert transaccion";

    $scope.insert();

  }

  console.log('operacion de datos realizada: ' + metodo);

  console.log('controlador -calc- funcion: save - fin');

}//save





  /*funcion para insertar transacción*/

  //TODO. ajustar mensajes de error y exito

  $scope.insert = function() {

    console.log('-calc- funcion:insert. inicio');

    $http.post('./calc/insert_transaccion.php', JSON.stringify($scope.dataSave))

    .then(function (response) {

      //debugger;

      //+$scope.showErrorNotFound = false;

      if (response.data){

        var dataResp = response.data.records[0];

        if(dataResp.resultado != null)

          if(dataResp.resultado == 'EXITO'){

            $scope.msg = "Datos registrados con Exito!";

            $scope.data.id_transaccion = dataResp.id_trans;

            console.info('transaccion.id: ' + dataResp.id_trans);

            //+$scope.mostrarExito = true;

            //+$scope.showError = false;

          }else if(dataResp.resultado == 'ERROR'){

            $scope.msg = '\n' + data.mensaje;

            //+$scope.showError = true;

            //+$scope.mostrarExito = false;

          }

        }

      }, function (response) {

        $scope.msg = "Ups. Hubo un error al intentar registrar la Informacion: Service not Exists (insert_transaccion)";

        $scope.statusval = response.status;

        $scope.statustext = response.statusText;

          //$scope.headers = response.headers();

          $scope.mostrarError = true;

          $scope.mostrarExito = false;

        });

    console.log('-calc- funcion:insert. fin');

  };//insert





  /*funcion para actualizar transacción, datos de beneficiario*/

  //TODO. ajustar mensajes de error y exito

  //TODO. esta funcion tambien debo incorporarla a un modulo de pago que no venga de la calculadora,

  //pues el usuario puede salirse de la calculadora luego de que se crea la transacción

  $scope.updateTransaccionBeneficiarios = function() {

    console.log('calc- funcion:updateTransaccionBeneficiarios. inicio');

    console.log('$scope.dataSave');

    console.log($scope.dataSave);

    $http.post('./calc/insert_pago_destino.php', JSON.stringify($scope.dataSave))

    .then(function (response) {

      //debugger;

      //+$scope.showErrorNotFound = false;

      if (response.data){

        var dataResp = response.data.records[0];

        if(dataResp.resultado != null)

          if(dataResp.resultado == 'EXITO'){

            $scope.msg = "Datos de beneficiario registrados con Exito!";

            //$scope.data.id_transaccion = dataResp.resultado.id_trans;

            //console.info('transaccion.id: ' + $scope.transaccion.id);

            //+$scope.mostrarExito = true;

            //+$scope.showError = false;

          }else if(dataResp.resultado == 'ERROR'){

            $scope.msg = '\n' + data.mensaje;

            //+$scope.showError = true;

            //+$scope.mostrarExito = false;

          }

        }

      }, function (response) {

        $scope.msg = "Ups. Hubo un error al intentar registrar la Informacion: Service not Exists (update_transaccion4)";

        $scope.statusval = response.status;

        $scope.statustext = response.statusText;

          //$scope.headers = response.headers();

          $scope.mostrarError = true;

          $scope.mostrarExito = false;

        });

    console.log('-calc- funcion:updateTransaccionBeneficiarios. fin');

  };//insert





//aplicar porcentaje de comision a las tasas de cambios

$scope.aplicarComisionTasas = function(){

  console.log('aplicarComisionTasas. start');

  console.log('Porc_comision: ' + $scope.porc_comision);

  console.log('USD_PYG: '       + $scope.USD_PYG);

  console.log('USD_VES_rate : ' + $scope.USD_VES_rate);

  console.log('PYG_VES: '       + $scope.PYG_VES);



  //tasa Gs./Bs. luego de la comisión

  //v1. se resta la comisión

  //var tasa_PYG_Bs_final    = $scope.PYG_VES * (1 - $scope.porc_comision/100);

  //v2. se suma la comisión

  var tasa_PYG_Bs_final    = $scope.PYG_VES * (1 + $scope.porc_comision/100);

  //$scope.tasa_PYG_Bs_final = tasa_PYG_Bs_final.toFixed(0); //sin decimales
  $scope.tasa_PYG_Bs_final = tasa_PYG_Bs_final; //sin redondeo, para evitar imprecisiones

  //$scope.tasa_PYG_Bs_final = tasa_PYG_Bs_final.toFixed(2); //round a 2 decimales



  //tasa USD/Bs luego de la comisión

  //v1. se resta la comisión

  //var tasa_USD_Bs_final    = $scope.USD_VES_rate * (1 - $scope.porc_comision/100);

  //v2. se suma la comisión

  //var tasa_USD_Bs_final    = $scope.USD_VES_rate * (1 + $scope.porc_comision/100);

  //v3. no se suma la comisión, porque ya se añadió a la tasa USD-origen

  



  //v1.tasa promedio, tiene 1.00 para convertir a decimal

  var tasa_USD_Bs_final    = $scope.USD_VES_rate * 1.00;

  

  //v4. mejor tasa de venta, tiene 1.00 para convertir a decimal

  var tasa_USD_Bs_final    = $scope.USD_VES_sell * 1.00;

  



  $scope.tasa_USD_Bs_final = tasa_USD_Bs_final; //sin round de decimales

  //$scope.tasa_USD_Bs_final = tasa_USD_Bs_final.toFixed(2); //round a 2 decimales

  //$scope.tasa_USD_Bs_final = tasa_USD_Bs_final.toFixed(0); //sin decimales



  //tasa USD/Gs luego de la comisión

  //v1. se resta la comisión

  //var tasa_USD_PYG_final    = $scope.USD_PYG * (1 - $scope.porc_comision/100);

  //v2. se suma la comisión

  var tasa_USD_PYG_final    = $scope.USD_PYG * (1 + $scope.porc_comision/100);

  $scope.tasa_USD_PYG_final = tasa_USD_PYG_final; //sin redondeo, para evitar imprecision en el calculo
  //$scope.tasa_USD_PYG_final = tasa_USD_PYG_final.toFixed(2); //round a 2 decimales



  console.log('tasa_USD_PYG_final:' + $scope.tasa_USD_PYG_final);

  console.log('tasa_USD_Bs_final: ' + $scope.tasa_USD_Bs_final);

  console.log('tasa_PYG_Bs_final: ' + $scope.tasa_PYG_Bs_final);





  //recalcular montos con comision

  $scope.calcularMontoDestinoconComision();



  //TODO. haciendo. 02/06/2021

  //$scope.calcularMontoDolaresconComision();

  //TODO. haciendo. 06/06/2021

  $scope.calcularMontoOrigenconComision();

  console.log('aplicarComisionTasas. end');

};  



/*

//v1

//calcula monto destino con comisión

//monto-destino = monto-origen * tasa origen-destino

$scope.calcularMontoDestinoconComision = function(){

  console.log('calcularMontoDestinoconComision. start');

  console.log('tasa_PYG_Bs_final: ' + $scope.tasa_PYG_Bs_final);

  console.log('monto1-origen: ' + $scope.data.monto1);

  

  var monto2         = $scope.data.monto1 * $scope.tasa_PYG_Bs_final;

  $scope.data.monto2 =  parseFloat(monto2.toFixed(0)); //0 decimales 



  console.log('monto2-destino: ' + $scope.data.monto2);

  console.log('calcularMontoDestinoconComision. end');

}//calcularMontoDestinoconComision

*/



//v2

//calcula monto destino con comisión

//monto-destino = monto-USD * tasa USD-destino

$scope.calcularMontoDestinoconComision = function(){

  console.log('calcularMontoDestinoconComision. start');  

  console.log('$scope.data.monto3: ' + $scope.data.monto3);  

  

  var montoDestino   = $scope.data.monto3 * $scope.tasa_USD_Bs_final;

  $scope.data.monto2 = parseFloat(montoDestino.toFixed(0)); //0 decimales 



  console.log('tasa_USD_Bs_final: ' + $scope.tasa_USD_Bs_final);

  console.log('monto1-origen: ' + $scope.data.monto1);

  console.log('monto2-destino: ' + $scope.data.monto2);

  console.log('calcularMontoDestinoconComision. end');

}



//TODO. terminar

//calcula monto origen con comisión, en base a monto dolares

//monto-origen = monto-dolar * tasaUSD/destino

$scope.calcularMontoOrigenconComision = function(){

  //*

  console.log('calcularMontoOrigenconComision. start');

  console.log('tasa_USD_PYG_final: ' + $scope.tasa_USD_PYG_final);

  console.log('monto3-dolares: ' + $scope.data.monto3);

  

  var montoOrigen    = $scope.data.monto3 * $scope.tasa_USD_PYG_final;

  $scope.data.monto1 = parseFloat(montoOrigen.toFixed(0)); //sin decimales 



  console.log('monto1-origen: ' + $scope.data.monto1);

  console.log('calcularMontoOrigenconComision. end');

}



//OJO.NO USAR! no se puede reducir la cantidad de dolares

//el usuario tiene que mostrarse el monto de dolares USD exactos a enviar

//TODO. terminar.

//calcula monto origen con comisión, en base a monto origen

//monto-usd = monto-destino / tasaUSD/en-destino

$scope.calcularMontoDolaresconComision = function(){

  //*

  console.log('calcularMontoDolaresconComision. start');

  console.log('tasa_USD_Bs_final: ' + $scope.tasa_USD_Bs_final);

  console.log('monto2-destino: ' + $scope.data.monto2);

  var montoUSDconComision    = $scope.data.monto2 / $scope.tasa_USD_Bs_final;

  $scope.data.montoUSDconComision =  parseFloat(montoUSDconComision.toFixed(2)); //2 decimales 



  console.log('monto3-usd: ' + $scope.data.monto3);

  console.log('calcularMontoDolaresconComision. end');

}







    //captura parametro que viene en url: login

    $scope.capturarParametro = function(){

      $scope.login = $routeParams.userLogin;

      console.log('capturarParametro.login = ' + $scope.login);

      //TODO. validar parametro login:

      //que no sea vacio

      //solo que tenga caracteres validos

      //longitud

      //no comience con un nro,etc...

      //hacerle limpieza de texto para evitar injection sql

    }//end-capturarParametro







  //TODO. agregar funcion. para cuando cambie la seleccion del pais origen, y pais destino

  //traer los valores de moneda correspondientes:

  //codmoneda, nombreplural

  //ademas calcular: montolimite minimo y maximo permitidos

  //asignar todos esos datos a la variable data



  $scope.init_function = function(){

    console.log('controlador -calc- init_function. inicio');

    $scope.saludo = "Saludo desde CTRL CALCULADORA";





    //captura parametro que viene en url: login

    $scope.login = '';

    $scope.capturarParametro();

    console.log('login = ' + $scope.login);





  //porc comision remesa, por defecto

  $scope.porc_comision = 8.00;



  //setear tasas a 0

  $scope.tasa_USD_Bs_final = 0;

  $scope.tasa_USD_PYG_final = 0;

  $scope.tasa_PYG_Bs_final = 0;



  //obtener datos del API yadio para tasas

  $scope.getDataYadio();



  //TODO. usar, indicando cual es la moneda de origen

  //$scope.getDataYadioMonedaPYG();



  $scope.modo = 'CALC';

  $scope.initData();

  $scope.cargarPaises();

  $scope.cargarBancosDestino();

  $scope.cargarBancosOrigen();

  

  //-v1. $scope.setTasasCambio();

  $scope.aplicarComisionTasas();

  //$scope.calcularConBaseUSD();

  

  //-v1. $scope.calcular3_A();

  //-v1. $scope.calcular2_A();

  //$scope.calcularMontoDestinoconComision();

  $scope.setResumenOrigen();



    //estatus de pago, indica si el usuario ya realizó notificación de pago en origen

    $scope.pago = 0;

    

    //indica paso inicial a mostrar en la calculadora

    //valor por defecto: 1

    $scope.paso = 1; //1:calculo, 2:forma de pago origen, 3:enviar-comprobantes, 4:datos-beneficiario

    //no usado: resumen

    //no usado: datos del usuario que envía

    

    //forma de pago por defecto

    $scope.origen.formapago = ''; //'': ninguno, DEP': deposito bancario, 'G...':giro, 'WU':western union

    //cantidad de comprobantes de pago en origen

    $scope.origen.cant_comprobantes = 0;



    

    //valores de prueba

    //$scope.data.id_transaccion=33;

    //$scope.origen.formapago = 'DEP'; //deposito bancario

    //$scope.user.login = 'admin';



    console.log('login = ' + $scope.login);

    //asignar usuario que llamó a la calculadora

    if (!$scope.login || $scope.login.trim() == '')

      $scope.user.login = 'admin';

    else

    //si la calculadora no es llamada con usuario, usar el admin

      $scope.user.login = $scope.login;

    console.log('user.login = ' + $scope.user.login);





/*TODO. agregar parametro que indica el modo: CALC: solo calculadora, PAGO: registrar pago

    $scope.capturarParametro();

    if($scope.modo == 'CALC'){

      console.log('opcion CALC');

      $scope.initData();

    }else{

      //$scope.showData();

    }

    */











    console.log('controlador -ctrlCalc- init_function. fin');

  }//end-init_function



  //INICIO CONTROLADOR

  $scope.init_function();



}]);//end-controller-calc











//NO USADO, de aquí en adelante.

//Pues se pasó el paso de adjuntar comprobantes al chat

//pero sí funciona para realizar adjuntos

//se pueden arrastrar las imagenes, o buscar en el explorador de archivos





//TODO. mejor crear otra vista y ctrl, para manejar la pantalla cuando sea modo PAGO

//eliminando el uso de la variable modo

//asi la programacion sera mas sencilla

//un controlador para la calculadora sin comprobante de pago

//y un controlador para adjuntar los comprobantes













//modulo para subir imagenes-capturas

angular.module('myApp.calcPago', ['angularFileUpload'])

.controller('AdjuntosCtrl', ['$scope', 'FileUploader', function($scope, FileUploader) {

    console.log('mensaje desde AppController con angularFileUpload');



    //llama a upload.php para subir archivos

    var uploader = $scope.uploader = new FileUploader({

        url: 'upload/upload.php'

    });



        // FILTERS

        uploader.filters.push({

            name: 'imageFilter',

            fn: function(item /*{File|FileLikeObject}*/, options) {

                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';

                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;

                //solo admite estos formatos de imagenes

            }

        });



        // CALLBACKS



        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {

            console.info('onWhenAddingFileFailed', item, filter, options);

        };

        uploader.onAfterAddingFile = function(fileItem) {

            console.info('onAfterAddingFile', fileItem);

        };

        uploader.onAfterAddingAll = function(addedFileItems) {

            console.info('onAfterAddingAll', addedFileItems);

        };

        uploader.onBeforeUploadItem = function(item) {

            console.info('onBeforeUploadItem', item);

        };

        uploader.onProgressItem = function(fileItem, progress) {

            console.info('onProgressItem', fileItem, progress);

        };

        uploader.onProgressAll = function(progress) {

            console.info('onProgressAll', progress);

        };

        uploader.onSuccessItem = function(fileItem, response, status, headers) {

            console.info('onSuccessItem', fileItem, response, status, headers);

        };

        uploader.onErrorItem = function(fileItem, response, status, headers) {

            console.info('onErrorItem', fileItem, response, status, headers);

        };

        uploader.onCancelItem = function(fileItem, response, status, headers) {

            console.info('onCancelItem', fileItem, response, status, headers);

        };

        uploader.onCompleteItem = function(fileItem, response, status, headers) {

            console.info('onCompleteItem', fileItem, response, status, headers);

        };

        uploader.onCompleteAll = function() {

            console.info('onCompleteAll');

        };



        console.info('uploader', uploader);



}])



    // Angular File Upload module does not include this directive

    // Only for example

    /**

    * The ng-thumb directive

    * @author: nerv

    * @version: 0.1.2, 2014-01-09

    */

    .directive('ngThumb', ['$window', function($window) {

        var helper = {

            support: !!($window.FileReader && $window.CanvasRenderingContext2D),

            isFile: function(item) {

                return angular.isObject(item) && item instanceof $window.File;

            },

            isImage: function(file) {

                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';

                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;

            }

        };



        return {

            restrict: 'A',

            template: '<canvas/>',

            link: function(scope, element, attributes) {

                if (!helper.support) return;



                var params = scope.$eval(attributes.ngThumb);



                if (!helper.isFile(params.file)) return;

                if (!helper.isImage(params.file)) return;



                var canvas = element.find('canvas');

                var reader = new FileReader();



                reader.onload = onLoadFile;

                reader.readAsDataURL(params.file);



                function onLoadFile(event) {

                    var img = new Image();

                    img.onload = onLoadImage;

                    img.src = event.target.result;

                }



                function onLoadImage() {

                    var width = params.width || this.width / this.height * params.height;

                    var height = params.height || this.height / this.width * params.width;

                    canvas.attr({ width: width, height: height });

                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);

                }

            }

        };

    }]);









































//NOT USED YET

//TODO. AHORA. en desarrollo

//ctrl que abre la calculadora asociado al login del usuario

//ejemplo de ruta: http://localhost/naguarabit/app/#!/calc/user

angular.module('myApp.calcUser', ['ngRoute']) //TODO. test: ,'ngStorage'



.controller('ctrlCalcUser', ['$scope', '$http', function($scope, $http) {



  $scope.init_function = function(){

    console.log('controlador -ctrlCalcUser- init_function. inicio');

    $scope.saludo = "Saludo desde Controlador: CalcUser";



  //porc comision remesa

  $scope.porc_comision = 6.0;

  $scope.tasa_USD_Bs_final = 0;

  $scope.tasa_USD_PYG_final = 0;

  $scope.tasa_PYG_Bs_final = 0;



  $scope.getDataYadio();

  //$scope.getDataYadioMonedaPYG();



  $scope.modo = 'CALC';

  $scope.initData();

  $scope.cargarPaises();

  $scope.cargarBancosDestino();

  $scope.cargarBancosOrigen();

  

  //-v1. $scope.setTasasCambio();

  $scope.aplicarComisionTasas();

  //$scope.calcularConBaseUSD();

  

  //-v1. $scope.calcular3_A();

  //-v1. $scope.calcular2_A();

  //$scope.calcularMontoDestinoconComision();

  $scope.setResumenOrigen();



    //estatus de pago, indica si el usuario ya realizó notificación de pago en origen

    $scope.pago = 0;

    

    //indica paso inicial a mostrar en la calculadora

    //valor por defecto: 1

    $scope.paso = 1; //1:calculo, 2:forma de pago origen, 3:enviar-comprobantes, 4:datos-beneficiario

    //no usado: resumen

    //no usado: datos del usuario que envía

    

    //forma de pago por defecto

    $scope.origen.formapago = ''; //'': ninguno, DEP': deposito bancario, 'G...':giro, 'WU':western union

    //cantidad de comprobantes de pago en origen

    $scope.origen.cant_comprobantes = 0;



    

    //valores de prueba

    //$scope.origen.formapago = 'DEP'; //deposito bancario

    $scope.user.login = 'admin';

    //$scope.data.id_transaccion=33;







    /*TODO. agregar parametro que indica el modo: CALC: solo calculadora, PAGO: registrar pago

    $scope.capturarParametro();

    if($scope.modo == 'CALC'){

      console.log('opcion CALC');

      $scope.initData();

    }else{

      //$scope.showData();

    }

    */

    console.log('controlador -ciudad- init_function. fin');

  }



  //INICIO CONTROLADOR

  $scope.init_function();



}])//end-ctrlCalcUser



;//final-module