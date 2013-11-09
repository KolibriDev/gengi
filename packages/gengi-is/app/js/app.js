(function(){
  define(
    [
      'angular',
      'text!/partials/calcHeader.html',
      'ngResource',
      'ngRoute',
      'ngAnimate'
    ],
    function(angular, calcHeader) {
      var app = angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate']);

      app.run(function($templateCache) {
        $templateCache.put('calcHeader', calcHeader);
      });

      return app;
    }
  );
}).call(this);