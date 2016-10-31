'use strict';

angular.module('libraryApp')
  .controller('authorListCtrl', function($scope, $http, $cookies, CoreService){
    $scope.update = function(){
      $http({
        method: 'GET',
        url: CoreService.hostApi+'/api/library/authors/',
        headers: {
          'Authorization': 'Token ' + $cookies.get('authToken')
        }
      }).success(function(authors){
        $scope.authors = authors;
      });
    }

    $scope.remove = function(id){
      if(!confirm('Remover o registro selecionado')){
        return;
      }

      $http({
        method: 'DELETE',
        url: CoreService.hostApi+'/api/library/authors/' + id + '/',
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
