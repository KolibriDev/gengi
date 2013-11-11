(function() {
  define(['app'], function(app) {
    return app.controller('listCtrl', function($rootScope) {
      $rootScope.pageTitle = 'Gengi.is - Nýjasta gengi gjaldmiðla á svipstundu';

      // Header
      $rootScope.headerTpl = 'partials/listHeader.html';
      $rootScope.listView = 'list';
      $rootScope.updateView = function(type) {
        $rootScope.listView = type;
      };
    });
  });
}).call(this);
