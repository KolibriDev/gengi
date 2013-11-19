(function() {
  define(['app'], function(app) {
    return app.controller('listCtrl', function($rootScope) {
      $rootScope.pageTitle = 'Gengi.is - Nýjasta gengi gjaldmiðla á svipstundu';

      // Header
      $rootScope.headerTpl = 'partials/listHeader.html';

      if (localStorage.getItem('listView') === null) {
        localStorage.setItem('listView', 'list');
      }
      $rootScope.listView = localStorage.getItem('listView');

      if (localStorage.getItem('listExpand') === null) {
        localStorage.setItem('listExpand', '');
      }
      $rootScope.listExpand = localStorage.getItem('listExpand');

      $rootScope.updateView = function(type) {
        $rootScope.listView = type;
        localStorage.setItem('listView', type);
      };
      $rootScope.expandList = function(value) {
        $rootScope.listExpand = value;
        localStorage.setItem('listExpand', value);
      };
    });
  });
}).call(this);
