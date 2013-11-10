(function() {
  define(['app'], function(app) {
    return app.controller('aboutCtrl', function($rootScope) {
      $rootScope.pageTitle = 'Gengi.is';

      // Header
      $rootScope.headerTpl = 'partials/aboutHeader.html';
    });
  });
}).call(this);
