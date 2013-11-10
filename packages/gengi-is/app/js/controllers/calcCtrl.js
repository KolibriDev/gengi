(function() {
  define(['app', 'factories/Currency'],
    function(app) {
      return app.controller('calcCtrl',
        function($rootScope, $scope, $routeParams, Currency) {

          $rootScope.headerTpl = 'calcHeader';
          // Get currency
          Currency.get({currName: $routeParams.currName},
            function sucess(curr) {
              $scope.currency = curr;

              $scope.fromValue = 1;
              $scope.calcRate = calcRate;

              // Header
              $rootScope.pageTitle = curr.longName + ' - Gengi.is';
              $rootScope.currencyShortName = curr.shortName;
              $rootScope.currencyLongName = curr.longName;
            },
            function error(err) {
              console.log(err);
            }
          );
        }
      );
    }
  );

  function calcRate(rate, amount) {
    rate = parseFloat(String(rate).replace(',', '.'), 0);
    amount = parseFloat(String(amount).replace(',', '.'), 0);

    var value = (rate*amount);

    if(isNaN(value)) return 0;
    return value.toFixed(1);
  }

}).call(this);