(function() {
  define(['app', 'factories/currency'], function(app) {
    return app.controller('listCtrl', function($rootScope, $scope, Currency) {
      $rootScope.pageTitle = 'Gengi.is';
      $scope.items = Currency.query();

      // Header
      $rootScope.headerTpl = 'partials/listHeader.html';
      $rootScope.listView = 'list';
      $rootScope.updateView = function(type) {
        $rootScope.listView = type;
      };
    });
  });
}).call(this);
