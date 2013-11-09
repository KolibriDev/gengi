(function() {
  define(['app', 'factories/currency'], function(app) {
    return app.controller('listCtrl', function($rootScope, $scope, Currency) {
      $rootScope.pageTitle = 'Gengi.is';
      $scope.items = Currency.query();
    });
  });
}).call(this);
