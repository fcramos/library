'use strict';

angular.module('libraryApp')
  .factory('interceptor', function( $q, $rootScope ) {
      return {
        'responseError' : function(response) {
          if ( response.status == 403 || response.status == 401 ){
            $rootScope.$broadcast('login:required');
          }
          return $q.reject( response );
        }
      };
    })
