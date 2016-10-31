'use strict';

angular.module('libraryApp', ['ngRoute', 'ngCookies', 'ui.bootstrap'])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('interceptor');
  });
