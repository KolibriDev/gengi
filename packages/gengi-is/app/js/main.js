require.config({
  baseUrl: 'js',
  paths: {
    modernizr: 'vendor/modernizr',
    jQuery: 'vendor/jquery',
    angular: 'vendor/angular',
    ngResource: 'vendor/angular-resource',
    ngRoute: 'vendor/angular-route',
    ngAnimate: 'vendor/angular-animate'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    ngResource: {
      deps: ['angular']
    },
    ngRoute: {
      deps: ['angular']
    },
    ngAnimate: {
      deps: ['angular']
    },
    jQuery: {
      exports: 'jQuery'
    },
    Modernizr: {
      exports: 'Modernizr'
    }
  }
});

require(['jQuery', 'angular', 'config/routes'], function($, angular) {
  $(function() {
    angular.bootstrap(document, ['app']);
  });
});
