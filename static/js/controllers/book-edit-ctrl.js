'use strict';

angular.module('libraryApp')
  .controller('bookEditCtrl', function($scope, $http, $routeParams, $cookies, $location, CoreService){

    $scope.authors = [];
    $http({
      method: 'GET',
      url: CoreService.hostApi+'/api/library/authors/',
      headers: {
        'Authorization': 'Token ' + $cookies.get('authToken')
      }
    }).success(function(authors){
      $scope.authors = authors;
    });

    $scope.categories = [];
    $http({
      method: 'GET',
      url: CoreService.hostApi+'/api/library/categories/',
      headers: {
        'Authorization': 'Token ' + $cookies.get('authToken')
      }
    }).success(function(categories){
      $scope.categories = categories;
    });

    $scope.book = {};

    var api = CoreService.hostApi + '/api/library/books/';

    var update = function(){
      $http({
        method: 'GET',
        url: api + $routeParams.id + '/',
        headers: {
          'Authorization': 'Token ' + $cookies.get('authToken')
        }
      }).success(function(book){
        $scope.book = book;
        // Transformando string de data em objeto para
        // ser manipulado pelo campo de data
        $scope.published_in = new Date($scope.book.published_in + ' 00:00:00');
      });
    }

    // Atulizando a data do objeto a cada alteração no campo
    $scope.$watch('published_in', function(newValue, oldValue) {
      if($scope.published_in){
        $scope.book.published_in = $scope.published_in.toISOString().slice(0,10);
      }
    });

    if($routeParams.id){
      update();
    }

    $scope.$on('login:confirmed', function(){
      update();
    });

    $scope.$on('logoff:confirmed', function(){
      $scope.book = {};
    });

    $scope.submit = function(){
      if ($scope.bookForm.$valid) {
        var url = api;
        var method;
        if($scope.book.id){
          method = 'PUT';
          url += $scope.book.id  + '/';
        }else{
          method = 'POST';
        }

        $http({
          method: method,
          url: url,
          data: $scope.book,
          headers: {
            'X-CSRFToken': $cookies.get('csrftoken'),
            'Authorization': 'Token ' + $cookies.get('authToken')
          }
        }).then(function(response) {
          $scope.canChangePage = true;
          $location.path('books');
        });
      }
    }

    $scope.$on('$routeChangeStart', function(event){
      if(
        $scope.bookForm.$dirty && !$scope.canChangePage &&
        !confirm(
          'Existem informações não salvas, deseja continuar assim mesmo?'
        )
      ){
        event.preventDefault();
      }
    });
  });
