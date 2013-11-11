(function() {
  define(['app'], function(app) {
    return app.controller('aboutCtrl', function($rootScope) {
      $rootScope.pageTitle = 'Um appið - Gengi.is';

      // Header
      $rootScope.headerTpl = 'partials/aboutHeader.html';
    });
  });
}).call(this);
