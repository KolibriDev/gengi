(function() {
  require.config({
    baseUrl: 'js',
    paths: {
      text: 'vendor/text',
      angular: 'vendor/angular.min',
      ngResource: 'vendor/angular-resource.min',
      ngRoute: 'vendor/angular-route.min',
      ngAnimate: 'vendor/angular-animate.min',
      underscore: 'vendor/underscore'
    },
    shim: {
      angular: { exports: 'angular' },
      ngResource: { deps: ['angular'] },
      ngRoute: { deps: ['angular'] },
      ngAnimate: { deps: ['angular'] },
      underscore: { exports: '_' }
    }
  });

  require(['angular', 'config/routes'], function(angular) {

    var loaded = 0;
    var bootstrap = function() {
      if (loaded) return;
      loaded = 1;
      angular.bootstrap(document, ['app']);
    };

    if ( document.readyState === 'complete' ) {
      setTimeout( bootstrap );
    } else {
      document.addEventListener( 'DOMContentLoaded', bootstrap, false );
      window.addEventListener( 'load', bootstrap, false );
    }
  });
}).call(this);
