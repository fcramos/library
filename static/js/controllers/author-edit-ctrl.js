'use strict';

angular.module('libraryApp')
  .controller('authorEditCtrl', function($scope, $http, $routeParams, $cookies, $location, CoreService){

    $scope.author = {};

    var api = CoreService.hostApi + '/api/library/authors/';

    var update = function(){
      $http({
        method: 'GET',
        url: api + $routeParams.id + '/',
        headers: {
          'Authorization': 'Token ' + $cookies.get('authToken')
        }
      }).success(function(author){
        $scope.author = author;
      });
    }

    if($routeParams.id){
      update();
    }

    $scope.$on('login:confirmed', function(){
      update();
    });

    $scope.$on('logoff:confirmed', function(){
      $scope.author = {};
    });

    $scope.submit = function(){
      if ($scope.authorForm.$valid) {
        var url = api;
        var method;
        if($scope.author.id){
          method = 'PUT';
          url += $scope.author.id  + '/';
        }else{
          method = 'POST';
        }

        $http({
          method: method,
          url: url,
          data: $scope.author,
          headers: {
            'X-CSRFToken': $cookies.get('csrftoken'),
            'Authorization': 'Token ' + $cookies.get('authToken')
          }
        }).then(function(response) {
          $scope.canChangePage = true;
          $location.path('author');
        });
      }
    }

    $scope.$on('$routeChangeStart', function(event){
      if(
        $scope.authorForm.$dirty && !$scope.canChangePage &&
        !confirm(
          'Existem informações não salvas, deseja continuar assim mesmo?'
        )
      ){
        event.preventDefault();
      }
    });
  });