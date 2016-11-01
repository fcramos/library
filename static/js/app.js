'use strict';

angular.module('libraryApp', ['ngRoute', 'ngCookies', 'ui.bootstrap'])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('interceptor');
    $routeProvider
      .when('/authors', {
        templateUrl: 'static/partials/author-list.html',
        controller: 'authorListCtrl'
      })
      .when('/authors/add', {
        templateUrl: 'static/partials/author-edit.html',
        controller: 'authorEditCtrl'
      })
      .when('/authors/:id', {
        templateUrl: 'static/partials/author-edit.html',
        controller: 'authorEditCtrl'
      })
      .when('/categories', {
        templateUrl: 'static/partials/category-list.html',
        controller: 'categoryListCtrl'
      })
      .when('/categories/add', {
        templateUrl: 'static/partials/category-edit.html',
        controller: 'categoryEditCtrl'
      })
      .when('/categories/:id', {
        templateUrl: 'static/partials/category-edit.html',
        controller: 'categoryEditCtrl'
      })
      .when('/books', {
        templateUrl: 'static/partials/book-list.html',
        controller: 'bookListCtrl'
      })
      .otherwise({
        redirectTo: '/books'
      });

  });
