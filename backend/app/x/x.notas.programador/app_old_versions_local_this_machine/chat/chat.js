'use strict';
//ejemplo app de chat
//tomada de https://www.pubnub.com/blog/angularjs-chat-getting-started/

//TODO: evaluar descarga de libreria pubnub
//TODO: buscar otra opcion a libreria pubnub, pues si ese servicio cae, el backend no servirá de mucho
angular.module('myApp.chat', ["pubnub.angular.service"])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat', {
    templateUrl: 'chat/index.html',
    controller: 'chatCtrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat/:id_transaccion', {
    templateUrl: 'chat/index.html',
    controller: 'chatCtrl',
    params: {input:null}
  });
}])


.controller('chatCtrl', function($scope, Pubnub, $routeParams) {  

  //datos de transacción
  console.log('id_transaccion: ' + $routeParams.id_transaccion);
  $scope.id_transaccion = $routeParams.id_transaccion;
  console.log('id_transaccion: ' + $scope.id_transaccion);
   
   //TODO. deseable, armar estructura para tener todos los datos de la remesa
   //$scope.data = {};
   //$scope.data.id_transaccion=false; 






   //ocultar enviador de archivos
   $scope.showUploader=false; 
   
   $scope.channel = 'messages-channel';
   //set the messageContent input
   $scope.messageContent = '';


  //genera random string con una longitud especifica
  function generateString(length) {
      // declare all characters
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = ' ';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

   // Generating a random uuid between 1 and 100 using an utility function from the lodash library.         
   //$scope.uuid = _.random(100).toString();
   //$scope.uuid = 'gperez'; //'uuid-user', debe generarse un uuid unico por cada usua
   $scope.uuid = generateString(5);
   
   //inicializa chat
   Pubnub.init({
         publish_key: 'pub-c-6eb5aa94-cbac-49e5-968e-75f86f205274',
         subscribe_key: 'sub-c-87f2c7b6-2158-11eb-b558-be5397d4d556',
         uuid: $scope.uuid
       });


    // Send the messages over PubNub Network
    $scope.sendMessage = function() {
       // Don't send an empty message 
       if (!$scope.messageContent || $scope.messageContent === '') {
            return;
        }
        Pubnub.publish({
            channel: $scope.channel,
            message: {
                content: $scope.messageContent,
                sender_uuid: generateString(5), //$scope.uuid, //TODO. debe usarse id de usuario logueado
                date: new Date()
            },
            callback: function(m) {
                console.log(m);
            }
            //sender_uuid = generateString(5),
        });
        // Reset the messageContent input
        $scope.messageContent = '';

    };


    $scope.messages = [];
    /*
    //example message
    $scope.messages.push =  {
                title: "greeting",
                description: "This is my first message!"
    };
*/


    // Subscribing to the ‘messages-channel’ and trigering the message callback
    Pubnub.subscribe({
        channel: $scope.channel,
        triggerEvents: ['callback']
    });


    // A function to display a nice uniq robot avatar 
    $scope.avatarUrl = function(uuid){
        return 'http://robohash.org/'+uuid+'?set=set5&bgset=bg1&size=50x50';
    };


    // Listening to the callbacks
    $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {
        $scope.$apply(function () {
            $scope.messages.push(m)
        });
    });

    // web send file
    $scope.sendFile = function(){
      //const input = document.querySelector('input[file]');
      const input = document.getElementById('file_uploader');
      console.log('input:');
      console.log(input);
      input.addEventListener('change', async () => {
        const file1 = input.files[0];
        console.log('info:');
        console.log(info);

        const result = await pubnub.sendFile({
          channel: 'messages-channel',
          file: file1,
        });

        console.log('result:');
        console.log(result);
      });      
    }//end-sendFile

    // obtener lista de archivos
    $scope.listarArchivos = function(){
      //const result = await pubnub.listFiles({ channel: 'my_channel' });
      const result = pubnub.listFiles({ channel: 'messages-channel' });
    }
    
    // show sent file
    $scope.showImageFile = function(){
      //const file = await pubnub.downloadFile({
      const file = pubnub.downloadFile({
        channel: 'messages-channel',
        id: '...',
        name: 'cat_picture.jpg',
      });
      const myImageTag = document.createElement('img');
      //myImageTag.src = URL.createObjectURL(await file.toFile());
      myImageTag.src = URL.createObjectURL(file.toFile());

      document.body.appendChild(myImageTag);
    }//end-showImageFile

 });//fin-chatCtrl