'use strict';

angular.module('libraryApp')
  .controller('bookListCtrl', function($scope, $http, $cookies, CoreService){

    $scope.authors = {};
    $http({
      method: 'GET',
      url: CoreService.hostApi+'/api/library/authors/',
      headers: {
        'Authorization': 'Token ' + $cookies.get('authToken')
      }
    }).success(function(authors){
      angular.forEach(authors, function(value){
        $scope.authors[value.id] = value.name;
      });
    });

    $scope.categories = {};
    $http({
      method: 'GET',
      url: CoreService.hostApi+'/api/library/categories/',
      headers: {
        'Authorization': 'Token ' + $cookies.get('authToken')
      }
    }).success(function(categories){
      angular.forEach(categories, function(value){
        $scope.categories[value.id] = value.description;
      });
    });

    $scope.update = function(){
      $http({
        method: 'GET',
        url: CoreService.hostApi+'/api/library/books/',
        headers: {
          'Authorization': 'Token ' + $cookies.get('authToken')
        }
      }).success(function(books){
        $scope.books = books;
      });
    }

    $scope.remove = function(id){
      if(!confirm('Remover o registro selecionado')){
        return;
      }

      $http({
        method: 'DELETE',
        url: CoreService.hostApi+'/api/library/books/' + id + '/',
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
      $scope.books = [];
    });
  });
