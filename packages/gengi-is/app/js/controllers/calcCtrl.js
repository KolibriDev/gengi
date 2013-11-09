(function() {
  define(['app', 'factories/Currency'], function(app) {
    return app.controller('calcCtrl', function($rootScope, $scope, $routeParams, Currency) {
      Currency.get({currName: $routeParams.currName},
        function sucess(curr) {
          $scope.currency = curr;

          // Header
          $rootScope.headerTpl = 'partials/_calcHeader.html';
          $rootScope.pageTitle = curr.longName + ' - Gengi.is';
        },
        function error(err) {
          console.log(err);
        }
      );
    });
  });
}).call(this);
