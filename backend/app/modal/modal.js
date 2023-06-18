'use strict';
//dependencias: 'ngAnimate','ui.bootstrap'
angular.module('myApp.modal', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/modal', {
    templateUrl: 'modal/modal.html',
    controller: 'ModalDemoCtrl'
  });
}])

/*add parametro: ui.bootstrap*/
.controller('ModalDemoCtrl', function ($scope, $log) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.animationsEnabled = true;

/*
  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
  */

})

/*
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
*/