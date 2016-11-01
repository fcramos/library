'use strict';

angular.module('libraryApp')
  .controller('categoryEditCtrl', function($scope, $http, $routeParams, $cookies, $location, CoreService){

    $scope.category = {};

    var api = CoreService.hostApi + '/api/library/categories/';

    var update = function(){
      $http({
        method: 'GET',
        url: api + $routeParams.id + '/',
        headers: {
          'Authorization': 'Token ' + $cookies.get('authToken')
        }
      }).success(function(category){
        $scope.category = category;
      });
    }

    if($routeParams.id){
      update();
    }

    $scope.$on('login:confirmed', function(){
      update();
    });

    $scope.$on('logoff:confirmed', function(){
      $scope.category = {};
    });

    $scope.submit = function(){
      if ($scope.categoryForm.$valid) {
        var url = api;
        var method;
        if($scope.category.id){
          method = 'PUT';
          url += $scope.category.id  + '/';
        }else{
          method = 'POST';
        }

        $http({
          method: method,
          url: url,
          data: $scope.category,
          headers: {
            'X-CSRFToken': $cookies.get('csrftoken'),
            'Authorization': 'Token ' + $cookies.get('authToken')
          }
        }).then(function(response) {
          $scope.canChangePage = true;
          $location.path('categories');
        });
      }
    }

    $scope.$on('$routeChangeStart', function(event){
      if(
        $scope.categoryForm.$dirty && !$scope.canChangePage &&
        !confirm(
          'Existem informações não salvas, deseja continuar assim mesmo?'
        )
      ){
        event.preventDefault();
      }
    });
  });
