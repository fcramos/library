'use strict';

angular.module('libraryApp')
  .controller('categoryListCtrl', function($scope, $http, $cookies, CoreService){
    $scope.update = function(){
      $http({
        method: 'GET',
        url: CoreService.hostApi+'/api/library/categories/',
        headers: {
          'Authorization': 'Token ' + $cookies.get('authToken')
        }
      }).success(function(categories){
        $scope.categories = categories;
      });
    }

    $scope.remove = function(id){
      if(!confirm('Remover o registro selecionado')){
        return;
      }

      $http({
        method: 'DELETE',
        url: CoreService.hostApi+'/api/library/categories/' + id + '/',
        headers: {
          'Authorization': 'Token ' + $cookies.get('authToken'),
          'X-CSRFToken': $cookies.get('csrftoken')
        }
      }).then(function(){
        $scope.update();
      })
    }

    $scope.$on('login:confirmed', function(){
      $scope.update();
    });

    $scope.$on('logoff:confirmed', function(){
      $scope.authors = [];
    });
  });
