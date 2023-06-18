//controlador asociado a template de calc/calculo.html

'use strict';

angular.module('myApp.calc', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calc', {
    templateUrl: 'calc/index.html',
    controller: 'ctrlCalc'
  });
}])

//valores posibles de modo: CALC, PAGO
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calc/:modopago', {
    templateUrl: 'calc/pago.html',
    controller: 'ctrlCalcPago'
  });
}])

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


//directiva para manejo de input tipo montos, permite mostrar punto como separador de miles, cuando se está escribiendo en el input
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


//ctrl que maneja los datos de calculadora, o sea la solicitud de remesa
.controller('ctrlCalc', ['$scope', '$http', function($scope, $http) {

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

//carga lista de bancos para pais origen
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

  var URLconsulta = "./simulador/api1_get.php";
    //debugger;
    $http.get(URLconsulta)
    .then(function(response) {
      //debugger;
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
      //debugger;
      console.error('Error en SERVICIO de consulta de datos: ', status, data);
    });   //TODO: gestionar error, cuando no se traigan los datos del usuario, mostrar mensaje en vista
    console.log('CtrlAPI.getDataYadio.inicio');
};//getDataYadio


//obtiene info de API Yadio para una moneda especifica, en este caso el guarani de PARAGUAY (PYG)
//y la guarda en la variable data3
$scope.getDataYadioMonedaPYG = function() {
  console.log('Ctrlsimulador.getDataYadioMonedaPYG.inicio. moneda: PYG');

    //TODO. especificar moneda a la URL, por ahora es PYG
    var URLconsulta = "./simulador/api_yadio_get_moneda.php";
    //debugger;
    $http.get(URLconsulta)
    .then(function(response) {
      //debugger;
      if (response.data.records != null){
        $scope.data3 = response.data.records;
        //console.log('Ctrlsimulador.getDataYadioMonedaPYG.inicio. moneda: PEN. respuesta api:');
        console.log(response.data)
        //valores particulares, tasas especificas
        $scope.PYG_VES = $scope.data3[0]['rate'];//bs por guarani, tasa promedio
        $scope.USD_PYG_rate = $scope.data3[0]['usd']; //guaranies por dolar, tasa promedio
        
        console.log('Ctrlsimulador.data:');
        console.log('PYG_VES: '+$scope.PYG_VES);
        console.log('USD_PYG_rate: '+$scope.USD_PYG_rate);

        //analizar si es necesario esta variable
        $scope.dataOk = $scope.dataOk && true;

        $scope.aplicarComisionTasas();

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

  //observaciones del usuario
  $scope.user={observ:''};

  //TODO. sacar la variable formapago del arreglo, usar variable simple
  //forma de pago Deposito Bancario
  $scope.origen={observ:'',formapago:'', nombrebank:'Itaú', nrocta:'12345678901234567890', nombretitular:'Dina Osma', doctitular:'1234567',
  comprobantePago:''};

  //forma de pago GIRO
  $scope.origen.giro={observ:'',nrotlf: '+595-889-5343434', nombretitular:'Dina Osma', doctitular:'8594651'};
  $scope.destino={observ:''};
};


/*
  establece valor para datos pago en origen
  */
  $scope.setResumenOrigen = function() {
    var resumen = '';
    var formaPago = $scope.origen.formapago;
    if (formaPago == 'DEP'){
      resumen += 'Banco:             ' + $scope.origen.nombrebank + '\n';
      resumen += 'Número de cuenta:  ' + $scope.origen.nrocta + '\n';
      resumen += 'Nombre de Titular: ' + $scope.origen.nombretitular + '\n';
      resumen += 'Cédula de Titular: ' + $scope.origen.doctitular;
    }else if (formaPago=='GTIGO' || formaPago=='GCLARO' || formaPago=='GPERS'){
      resumen += 'Número de Teléfono:   ' + $scope.origen.giro.nrotlf + '\n';
      resumen += 'Nombre de Titular:    ' + $scope.origen.giro.nombretitular + '\n';
      resumen += 'Documento de Titular: ' + $scope.origen.giro.doctitular;
    }
    $scope.origenResumen = resumen;
  };



//TODO.usar query de la bd
//obtiene nombre de pais, proporcionando su codigo
//usar variable lista_paises
$scope.getNombrePais = function() {
  var paises = {PAR:'Paraguay', VEN:'Venezuela', URU:'Uruguay', ARG: Argentina};
  var nombrePais1 = paises[$scope.data.cod_pais1];
}



//TODO. debe obtener lista de  tasas de cambio entre monedas mediante API's o consultas en BD
//igual al usado en el controlador de simulador
$scope.setTasasCambio = function() {
    //$scope.factoresCambio = {{'GS','BS', 2}}; //enprogreso con funciones que usan api
    $scope.tasas_cambio_dolar = {
      //valor en Gs, al comprar BTC, equivalente a 1 dolar
      Gs_BTC_compra: 6500, //6472.06 tasa cuando comence a programar este modulo, usando btc
      
      //valor en Bs, por vender el equivalente de 1 dolar, usando BTC
      BTC_Bs_venta: 130973 //ref localbitcoin usano api de yadio (dollartoday?)
      //2020-04-11
       //13009.55 //octubre2019
       //10658.55 tasa cuando comence a programar este modulo, usando btc
     };
   };



//calcula monto2 basado en monto1 y en tasas de cambio
//segun la formula
//monto2 = monto1 / (valor de 1$ en Gs "a la compra") * (Valor de 1$ en Bs "a la venta")
//siendo:
//monto1: monto en pais de origen
//monto2: monto en pais de destino
$scope.calcular2_A = function() {
 var monto2= $scope.data.monto1 / $scope.tasas_cambio_dolar['Gs_BTC_compra'] * $scope.tasas_cambio_dolar['BTC_Bs_venta'];
 //aplicar round sin decimales. $filter('number')(monto2, 0);
 $scope.data.monto2 = parseInt(monto2.toFixed(0));

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
  var monto1 = $scope.data.monto2 * $scope.tasas_cambio_dolar['Gs_BTC_compra'] / $scope.tasas_cambio_dolar['BTC_Bs_venta'];
  $scope.data.monto1 = parseInt(monto1.toFixed(0));
  console.log('controlador:calc. monto1='+$scope.data.monto1);
};


//calcula monto en USD, basado en monto origen
//esto es: calcula monto3 basado en monto1
//monto3 = monto1 / (valor de 1$ comprado con moneda de origen)
$scope.calcular3_A = function() {
 $scope.data.monto3 = 0;
 if (!$scope.data.monto1 || $scope.data.monto1 == 0 || $scope.data.monto1 == "") return;

 var monto3= $scope.data.monto1 / $scope.tasas_cambio_dolar['Gs_BTC_compra'];
 console.log('calc. calcular3_A. monto USD. antes de format =' + monto3);

 $scope.data.monto3 = parseFloat(monto3).toFixed(2);
 //$scope.data.monto3 = monto3.toFixed(2); //redondeo a 2 decimales. $filter('number')(monto2, 2);

 console.log('calc. calcular3_A. monto USD=' + $scope.data.monto3);
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

 var monto3 = $scope.data.monto2 / $scope.tasas_cambio_dolar['BTC_Bs_venta'];
 console.log('calc. calcular3_B. monto3 antesde format =' + monto3);
 $scope.data.monto3 = parseFloat(monto3).toFixed(2); //redondeo a 2 decimales
 //$filter('number')(monto2, 2);
 console.log('calc. calcular3_B. monto3=' + $scope.data.monto3);
};

//calcula monto1 y monto2 basado en monto3
//esto es: calcula monto origen y monto destino basado en monto en USD
//monto1 = monto3 * (Valor de 1$ en Gs. "a la compra")
//monto2 = monto3 * (Valor de 1$ en Bs. "a la venta")
$scope.calcularConBaseUSD = function() {
 console.log('calc. calcularEnBaseUSD. inicio');
 console.log('monto3=' + $scope.data.monto3);

 $scope.data.monto1 = 0;
 $scope.data.monto2 = 0;
 if (!$scope.data.monto3 || $scope.data.monto3 == 0 || $scope.data.monto3 == "") return;

 var monto1 = $scope.data.monto3 * $scope.tasas_cambio_dolar['Gs_BTC_compra'];
 $scope.data.monto1 = parseInt(monto1.toFixed(0)); //sin decimales

 var monto2 = $scope.data.monto3 * $scope.tasas_cambio_dolar['BTC_Bs_venta'];
 $scope.data.monto2 = parseInt(monto2.toFixed(0)); //sin decimales

 console.log('calc. calcularEnBaseUSD. monto1=' + $scope.data.monto1);
 console.log('calc. calcularEnBaseUSD. monto2=' + $scope.data.monto2);
};


//incrementa variable 'paso', para que pase al siguiente vista/formulario
$scope.goNext = function (){
  $scope.paso += 1;
  var prog = $scope.paso;
  actualizar_barraProgreso(prog);
  /*
  var xprogreso = document.getElementById("progreso_pasos");
  console.log("xprogreso: " + xprogreso);
  console.log("paso: " + $scope.paso);
  console.log("progreso %: " + ($scope.paso* 20) );
  xprogreso.setAttribute("value", "" + ($scope.paso* 20) );
  */
  /*
  if ($scope.paso == 5){
    location.href = '#!/calcConfirm';
    return;
  }
  */
};



//decremente variable paso, para que vista cambia a siguiente
$scope.goBack = function (){
  $scope.paso -= 1;
  var prog = $scope.paso;
  actualizar_barraProgreso(prog);
  /*
  var xprogreso = document.getElementById("progreso_pasos");
  xprogreso.setAttribute("value", "" + ($scope.paso* 20) );
  */
};

function actualizar_barraProgreso(prog){
  var xprogreso = document.getElementById("progreso_pasos");
  console.log("xprogreso: " + xprogreso);
  //console.log("paso: " + $scope.paso);
  console.log("Progreso Valor: " + prog);
  //xprogreso.setAttribute("value", "" + prog * 20); //TODO. quitar multip, dejar unidad
  xprogreso.setAttribute("value", "" + prog);
}



//confirmar y grabar data
$scope.confirm = function() {
  $scope.dataSave = $scope.armarDataParaGuardar();
  $scope.save();
    //TODO. digirir al usuario a otra pagina para confirmar, o solo mostrar mensaje con popup
    //TODO. enviar correo de notificacion al usuario, y al operador
  }


//setea valores de data para guardar
$scope.armarDataParaGuardar = function() {
  var dataSave = $scope.data;
  dataSave.user = $scope.user;
  dataSave.origen = $scope.origen;
  dataSave.destino = $scope.destino;
  dataSave.tasa_origen = $scope.tasas_cambio_dolar['Gs_BTC_compra'];
  dataSave.tasa_destino = $scope.tasas_cambio_dolar['BTC_Bs_venta'];

  console.log('$scope.dataSave: ' + dataSave);
  return dataSave;
};

//grabar data
$scope.save = function() {
  console.log('controlador -calc- funcion: save -inicio');
  var metodo = "";

  //TODO. validar datos a guardar
  if ($scope.data.id != null && $scope.data.id != "" && $scope.data.id != 0 ){
    metodo = "update";
    $scope.update();
  }else{
    metodo = "insert";
    $scope.insert();
  }
  console.log('controlador -calc- funcion: save - fin');
}//save

/*funcion para guardar data*/
  //TODO. arreglar mensajes de error y exito
  $scope.insert = function() {
    console.log('controlador-calc- funcion:insert - inicio');
    $http.post('./calc/insert_transaccion.php', JSON.stringify($scope.dataSave))
    .then(function (response) {
      debugger;
      //+$scope.showErrorNotFound = false;
      if (response.data){
        var dataResp = response.data.records[0];
        if(dataResp.resultado != null)
          if(dataResp.resultado == 'EXITO'){
            $scope.msg = "Datos registrados con Exito!";
            //+$scope.mostrarExito = true;
            //+$scope.showError = false;
          }else if(dataResp.resultado == 'ERROR'){
            $scope.msg = '\n' + data.mensaje;
            //+$scope.showError = true;
            //+$scope.mostrarExito = false;
          }
        }
      }, function (response) {
        $scope.msg = "Ups. Hubo un error al intentar registrar la Informacion: Service not Exists";
        $scope.statusval = response.status;
        $scope.statustext = response.statusText;
          //$scope.headers = response.headers();
          $scope.mostrarError = true;
          $scope.mostrarExito = false;
        });
    console.log('controlador-calc- funcion:insert - fin');
  };//insert




//aplicar porcentaje de comision a las tasas de cambios
$scope.aplicarComisionTasas = function(){
  console.log('aplicarComisionTasas:');
  console.log('porc_comision: ' + $scope.porc_comision);

  var tasa_Gs_Bs_final    = $scope.PYG_VES * (1 - $scope.porc_comision/100);
  $scope.tasa_Gs_Bs_final = tasa_Gs_Bs_final.toFixed(2); //round a 2 decimales

  var tasa_USD_Bs_final    = $scope.USD_VES_rate * (1 - $scope.porc_comision/100);
  $scope.tasa_USD_Bs_final = tasa_USD_Bs_final.toFixed(2); //round a 2 decimales

  console.log('tasa_USD_Bs_final: ' + $scope.tasa_USD_Bs_final);
  console.log('tasa_Gs_Bs_final: ' + $scope.tasa_Gs_Bs_final);

  $scope.calcularMontoDestinoconComision();

};  

$scope.calcularMontoDestinoconComision = function(){
  //recalcular montos con comision
  var monto2    = $scope.monto1 * $scope.tasa_Gs_Bs_final; //monto-origen * tasa origen-destino
  $scope.monto2 = monto2.toFixed(0); //0 decimales 
}


  //TODO. agregar funcion. para cuando cambie la seleccion del pais origen, y pais destino
  //traer los valores de moneda correspondientes:
  //codmoneda, nombreplural
  //ademas calcular: montolimite minimo y maximo permitidos
  //asignar todos esos datos a la variable data

$scope.init_function = function(){
  console.log('controlador -calc- init_function. inicio');
  $scope.saludo = "Saludo desde CTRL CALCULADORA";

  //porc comision remesa
  $scope.porc_comision = 7.00;
  $scope.tasa_USD_Bs_final = 0;


  $scope.getDataYadio();
  //$scope.getDataYadioMonedaPYG();

  $scope.modo = 'CALC';
  $scope.initData();
  $scope.cargarPaises();
  $scope.cargarBancosDestino();
  $scope.cargarBancosOrigen();
  $scope.setTasasCambio();
  $scope.calcular3_A();
  $scope.setResumenOrigen();
  
  $scope.calcular2_A();
  //$scope.calcularMontoDestinoconComision();

    //estatus de pago, indica si el usuario ya realizó notificación de pago en origen
    $scope.pago = 0;
    $scope.origen.formapago = ''; //deposito bancario

    //valores de variables usados para pruebas
    //indicar cual es el paso inicial a mostrar en la calculadora
    //valor por defecto = 1
    $scope.paso = 1; //1: inicio, 3 es la calculadora, 5: paso final
    //$scope.origen.formapago = 'DEP'; //deposito bancario



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

}]);

//TODO. mejor crear otra vista y ctrl, para manejar la pantalla cuando sea modo PAGO
//eliminando el uso de la variable modo
//asi la programacion sera mas sencilla



//incorpora variable para subir imagenes
angular.module('myApp.calcPago', ['angularFileUpload'])
.controller('AdjuntosCtrl', function($scope, FileUploader) {
  $scope.uploader = new FileUploader();
  console.log('mensaje desde AppController con angularFileUpload')
});



/*
//OPCION NO USADA AHORA
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calcConfirm', {
    templateUrl: 'calc/confirmar.html',
    controller: 'ctrlCalcConfirm'
  });
}])
*/

/*TODO
  //captura parametro - modo operacion
  $scope.capturarParametro = function(){
    $scope.codigo = $routeParams.codigo;
    console.log('codigo: ' + $scope.codigo);
    //TODO. validar parametro codigo:
    //que no sea vacio, solo que tenga caracteres validos, longitud, no comience con un nro,etc...
  }
  */