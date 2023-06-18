//usar para hacer llamada de php por metodo POST 
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
