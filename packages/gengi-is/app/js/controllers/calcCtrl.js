(function() {
  define(['app', 'underscore', 'factories/Currency'], function(app, _) {
    return app.controller('calcCtrl', function($rootScope, $scope, $routeParams, Currency) {
      Currency.get({},
        function sucess(curr) {
          curr = _.findWhere(
            curr.results,
            {shortName: $routeParams.currName}
          );
          $scope.currency = curr;
          $rootScope.pageTitle = curr.longName + ' - Gengi.is';
        },
        function error(err) {
          console.log(err);
        }
      );
    });
  });
}).call(this);
