'use strict';

angular.module('libraryApp')
  .controller('authCtrl', function($scope, $cookies, $http, $uibModal, $rootScope, CoreService){
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
      });

      modalInstance.result.then(function (user) {
        $http({
          method: 'POST',
          url: CoreService.hostApi+'/api/auth/token/',
          data: user,
          config: {ignoreAuthModule: true},
          headers: {
            'X-CSRFToken': $cookies.get('csrftoken')
          }
        }).success(function(data) {
          document.cookie = 'authToken=' + data.token + ';max-age=7200';
          $rootScope.$broadcast('login:confirmed');
        });
      });
    };

    $scope.$on('login:required', function(){
      $scope.open();
    });

    $scope.logoff = function(){
      document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      $rootScope.$broadcast('logoff:confirmed');
      $scope.open();
    };

  })

  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

    $scope.ok = function () {
      $uibModalInstance.close($scope.user);
    };
  });