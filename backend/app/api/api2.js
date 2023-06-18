//controlador asociado a template de simulador/simulador.html
'use strict';

angular.module('myApp.simulador', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/simulador', {
    templateUrl: 'simulador/1simulador.html',
    controller: 'CtrlAPI'
  });
}])



.controller('CtrlAPI', ['$scope', '$http', '$timeout', '$q', function($scope, $http, $timeout, $q) {

//trae info de la API Yadio, con tasas promedio
//guarda en la variable data
  $scope.getDataYadio = function() {
    console.log('Ctrlsimulador.getDataYadio.inicio');
		var URLconsulta = "./simulador/api1_get.php";
    //debugger;
    $http.get(URLconsulta)
    .then(function(response) {
      //debugger;
      if (response.data.records != null){
        $scope.data = response.data.records;
        $scope.showDataYadio();
        $scope.dataOk = true;
        $scope.calcularMontoOrigen_1();
        $scope.calcularMontoDestino_A();
      }
      else{
        $scope.msg = "Data  no encontrada. URL de busqueda: " + URLconsulta;
      }
    },
    function(data, status) {
      //debugger;
      console.error('Error en SERVICIO de consulta de datos: ', status, data);
    });   //TODO: gestionar error, cuando no se traigan los datos del usuario, mostrar mensaje en vista
    //console.log('Ctrlsimulador.getDataYadio.fin');
};//getDataYadio


//obtiene info de API Yadio para una moneda especifica, en este caso el guarani de PARAGUAY (PYG)
//y la guarda en la variable data3
  $scope.getDataYadioMonedaPYG = function() {
    console.log('Ctrlsimulador.getDataYadioMonedaPYG.inicio. moneda: PYG');

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
        console.log('PYG_VES: '+$scope.PYG_VES);
        console.log('USD_PYG_rate: '+$scope.USD_PYG_rate);

        //analizar si es necesario esta linea
        $scope.dataOk = $scope.dataOk && true;
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
};//getDataYadio








//NO USADO AUN
//trae la info de API bitcoinaverage y la guarda en la variable data2
 $scope.getData_bitcoinaverage = function() {
    console.log('Ctrlsimulador.getData_bitcoinaverage.inicio');

		var URLconsulta = "./simulador/api2_get.php";
    //debugger;
    $http.get(URLconsulta)
    .then(function(response) {
      //debugger;
      if (response.data.records != null){
        $scope.data2 = response.data.records;
        //NO USADA
        //$scope.getData2();
        $scope.calcValorAjustado();
        $scope.dataOk2 = true;
      }
      else{
        $scope.msg = "Data  no encontrada. URL de busqueda: " + URLconsulta;
      }
    },
    function(data, status) {
      //debugger;
      console.error('Error en SERVICIO de consulta de datos: ', status, data);
    });   //TODO: gestionar error, cuando no se traigan los datos del usuario, mostrar mensaje en vista
    console.log('Ctrlsimulador.getData_bitcoinaverage.inicio');
};//getData_bitcoinaverage


//obtener data especifica para mostrar en la vista, del API de Yadio
$scope.showDataYadio = function() {
  //debugger;
  //*console.log('BTC/VES toda la data: ' + $scope.data[0]['VES']);
  //*console.log('BTC/USD toda la data: ' + $scope.data[0]['USD']);
  //$scope.BTC_VES_price = $scope.data[0]['VES']['price']; //good
  //$scope.USD_VES_rate = $scope.data[0]['USD']['rate']; //Tasa Bs/USD

//bloques de datos
  $scope.VES = $scope.data[0]['VES'];
  $scope.BTC = $scope.data[0]['BTC'];
  $scope.USD = $scope.data[0]['USD'];

//valores particulares, tasas especificas
  //valor de BTC en USD
  $scope.BTC_USD_price = $scope.BTC['price'];
  //precio venta de 1 BTC por Bs
  $scope.BTC_VES_sell = $scope.VES['sell']; 
  //Tasa de Bs por USD
  $scope.USD_VES_rate = $scope.USD['rate'];
  //Tasa de Guaranies por USD (USD/Gs)
  $scope.USD_PYG = $scope.USD['PYG'];

    /*
  console.log('Consultando data de API Yadio...');
  console.log('BTC/USD: ' + $scope.BTC_USD_price);
  console.log('USD/Bs : ' + $scope.USD_VES_rate);
  console.log('BTC/Bs : ' + $scope.BTC_VES_sell);
  console.log('USD/PYG : ' + $scope.USD_PYG);
  */
};



//obtener data especifica para mostrar en la vista, API bitcoinAverage
$scope.getData2 = function() {
  console.log('consultando data... showData_bitcoinaverage');
  $scope.BTC_PYG_high = $scope.data2[0]['high'];
  console.log('BTC/PYG: ' + $scope.BTC_PYG_high);
};



//calcula valor ajustado de compra de BTC por PYG(guarani), para comparar con precios de compra en localbitcoins
$scope.calcValorAjustado = function(){
  //debugger;
  $scope.BTC_PYG_ajustado = $scope.BTC_PYG_high * (1 + $scope.data2.porctrader/100)
};



//calcula monto en dolares en base a monto1 (monto a moneda origen)
$scope.calcularMontoUSD = function(){
  console.log('tasa USD/PYG: ' + $scope.USD_PYG);
  console.log('monto1: ' + $scope.monto1);
  var montoUSD = $scope.monto1 / $scope.USD_PYG; 
  //console.log('simulador.montoUSD: ' + $scope.montoUSD);
  //aqui aplicar parse
  //$scope.montoUSD = $scope.montoUSD.toFixed(2); //TODO. aplicar round a 2 decimales
  $scope.montoUSD = parseFloat(montoUSD.toFixed(2));
  console.log('montoUSD: ' + $scope.montoUSD);
};

//calcular montoUSD (monto en moneda destino) basado en monto USD y tasa en dolares
$scope.calcularMontoDestino_A = function(){
  console.log('calcularMontoDestino_A');
  console.log('montoUSD: ' + $scope.montoUSD);
  console.log('tasa USD/Bs (USD_VES_rate): ' + $scope.USD_VES_rate);
  var monto2 = $scope.montoUSD * $scope.USD_VES_rate; //total Bs = montoUSD*tasaUSD
  $scope.monto2 = monto2.toFixed(2); //aplicar round a 2 decimales
  console.log('monto2: ' + $scope.monto2);
  $scope.aplicarComision();
};


//calcula monto1 (origen) basado en monto en dolares y en tasas de cambio
//segun la formula
//monto1 = montoUSD * tasa de cambio Gs/USD
//siendo:
//monto1: monto en pais de origen
//USD_PYG: tasa de USD en Gs
//TODO. generalizarlo para cualquier moneda destino
$scope.calcularMontoOrigen_1 = function() {
  console.log('controlador: simulador. calcularMontoOrigen_1');
  console.log('montoUSD=' + $scope.montoUSD);
  console.log('tasa USD_PYG=' + $scope.USD_PYG);
  var monto1 = $scope.montoUSD * $scope.USD_PYG;
  $scope.monto1 = parseFloat(monto1.toFixed(0));
  console.log('controlador:simulador. monto1=' + $scope.monto1);
};  

//EN PROCESO
//calcula monto destino, basado en monto origen
//esto es: calcula monto2 basado en monto1
//monto2 = monto1 * (valor de 1USD en Gs) * (valor de 1$ en Bs "a la venta")
$scope.calcularMontoDestino_B = function() {
 console.log('simulador. calcularMontoDestino_B. inicio');
 console.log('monto1=' + $scope.monto1);
 console.log('TASA PYG a VES=' + $scope.PYG_VES);
 //validacion
 if (!$scope.monto1 || $scope.monto1 == 0 || $scope.monto1 == "") return false;

 var monto2 = 0;
 var monto2 = $scope.monto1 * $scope.PYG_VES;
 //console.log('simulador. calcularMontoDestino_B. monto2 antes de formatear =' + monto2);
 $scope.monto2 = parseFloat(monto2).toFixed(0); //redondeo sin decimales
 console.log('simulador. calcularMontoDestino_B. monto2=' + $scope.monto2);

 $scope.aplicarComision();

};



/*
//OJO: NO USADO
//TODO. usar, no es urgente
//calcula monto1 y monto2 basado en montoUSD
//esto es: calcula monto origen y monto destino basado en monto en USD
//monto1 = montoUSD * (Valor de 1$ en Gs. "a la compra")
//monto2 = montoUSD * (Valor de 1$ en Bs. "a la venta")
$scope.calcularMontoConBaseUSD = function() {
 console.log('simulador. calcularEnBaseUSD. inicio');
 console.log('montoUSD=' + $scope.data.montoUSD);

 $scope.data.monto1 = 0;
 $scope.data.monto2 = 0;
 if (!$scope.data.montoUSD || $scope.data.montoUSD == 0 || $scope.data.montoUSD == "") return;

 var monto1 = $scope.data.montoUSD * $scope.tasas_cambio_dolar['Gs_BTC_compra'];
 $scope.data.monto1 = parseFloat(monto1.toFixed(0)); //sin decimales

 var monto2 = $scope.data.montoUSD * $scope.tasas_cambio_dolar['BTC_Bs_venta'];
 $scope.data.monto2 = parseFloat(monto2.toFixed(0)); //sin decimales

 console.log('simulador. calcularEnBaseUSD. monto1=' + $scope.data.monto1);
 console.log('simulador. calcularEnBaseUSD. monto2=' + $scope.data.monto2);
};
*/

//aplicar porcentaje de comision a los montos
$scope.aplicarComision = function(){
  var monto1_final  = $scope.monto1 * (1 - $scope.porc_comision/100);
  var montoUSD_final = $scope.montoUSD * (1 - $scope.porc_comision/100);
  var montoBs_final  = $scope.monto2 * (1 - $scope.porc_comision/100);
  
  //var tasa_USD_Destino_final  = $scope.USD_PYG_rate * (1 - $scope.porc_comision/100);

  $scope.monto1_final = monto1_final.toFixed(0); //round a 0 decimales
  $scope.montoUSD_final = montoUSD_final.toFixed(2); //round a 2 decimales
  $scope.montoBs_final = montoBs_final.toFixed(0); //round a 0 decimales
  console.log('aplicarComision');
  console.log('montoUSD_final: ' + $scope.montoUSD_final);
  console.log('montoBs_final: ' + $scope.montoBs_final);

  $scope.aplicarComisionTasas();
};


//aplicar porcentaje de comision a las tasas de cambios
$scope.aplicarComisionTasas = function(){
  var tasa_Gs_Bs_final     = $scope.PYG_VES * (1 - $scope.porc_comision/100);
  $scope.tasa_Gs_Bs_final  = tasa_Gs_Bs_final.toFixed(1); //round a 0 decimales

  var tasa_USD_Bs_final  = $scope.USD_VES_rate * (1 - $scope.porc_comision/100);
  $scope.tasa_USD_Bs_final  = tasa_USD_Bs_final.toFixed(1); //round a 0 decimales


  console.log('aplicarComisionTasas>');
  console.log('tasa_Gs_Bs_final: ' + $scope.tasa_Gs_Bs_final);
  console.log('tasa_USD_Bs_final: ' + $scope.tasa_USD_Bs_final);
};


//INICIO DEL CONTROLADOR
console.log('Ctrlsimulador.inicio');
$scope.saludo = "*hello*";
$scope.dataOk = false;

//data de api
$scope.data = {info:'CARGANDO...'};

//valores iniciales
$scope.montoUSD= 10; //10 dolares
//$scope.monto1= 300000;

//porc comision remesa
$scope.porc_comision = 5.00;

//porc ganancia de trader, quien vende btc en paraguay
$scope.data2 = {porctrader: 7.5};
//valor inicial de porcentaje ajuste para comprar btc con Guaranies
$scope.data2.porctrader = 7;

$scope.BTC_VES_sell = 0.00;
$scope.BTC_USD_price = 0.00;
$scope.USD_VES_rate = 0.00;
$scope.BTC_PYG_ajustado = 0.00;

//$scope.calcularMontoOrigen_1();
$scope.getDataYadioMonedaPYG();
$scope.getDataYadio();

//NO USADO
//$scope.getData_bitcoinaverage();


}]

);
