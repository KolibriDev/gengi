(function() {
  require.config({
    baseUrl: 'js',
    paths: {
      modernizr: 'vendor/modernizr',
      jQuery: 'vendor/jquery',
      angular: 'vendor/angular',
      ngResource: 'vendor/angular-resource',
      ngRoute: 'vendor/angular-route',
      ngAnimate: 'vendor/angular-animate',
      underscore: 'vendor/underscore'
    },
    shim: {
      angular: { exports: 'angular' },
      ngResource: { deps: ['angular'] },
      ngRoute: { deps: ['angular'] },
      ngAnimate: { deps: ['angular'] },
      jQuery: { exports: 'jQuery' },
      Modernizr: { exports: 'Modernizr' },
      underscore: { exports: '_' }
    }
  });

  require(['jQuery', 'angular', 'config/routes'], function($, angular) {
    $(function() {
      angular.bootstrap(document, ['app']);
    });
  });
}).call(this);
