'use strict';

angular.module('libraryApp', ['ngRoute', 'ngCookies', 'ui.bootstrap'])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('interceptor');
    $routeProvider
      .when('/authors', {
        templateUrl: 'static/partials/author-list.html',
        controller: 'authorListCtrl'
      })
      .otherwise({
        redirectTo: '/authors'
      });

  });
