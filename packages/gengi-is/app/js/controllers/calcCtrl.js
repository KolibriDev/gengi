(function() {
  define(['app', 'factories/Currency'],
    function(app) {
      return app.controller('calcCtrl',
        function($rootScope, $scope, $routeParams, Currency) {

          // Update header template
          $rootScope.headerTpl = 'calcHeader';

          // Parse query string
          var calcQuery = parseQuery($routeParams.currName);

          // Get currency
          Currency.get({currName: calcQuery.currName},
            function sucess(curr) {
              $scope.currency = curr;

              $scope.fromValue = calcQuery.amount || 1;
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

  // Calculates the currency rate supporting floats
  function calcRate(rate, amount) {
    rate = parseFloat(String(rate).replace(',', '.'), 0);
    amount = parseFloat(String(amount).replace(',', '.'), 0);

    var value = (rate*amount);

    if(isNaN(value)) return 0;
    return value.toFixed(1);
  }

  // Parses the query string and returns the number and currency name
  function parseQuery(query) {
    if (/\d/.test(query)) {
      var amount = 1,
          currName = '';

      query.replace(/([0-9]+)/g, function(undefined, p1) {
        amount = p1;
      });

      query.replace(/(\D+)/g, function(undefined, p1) {
        currName = p1;
      });

      return {
        amount: amount,
        currName: currName
      };

    } else {
      return {
        amount: 1,
        currName: query
      };
    }
  }

}).call(this);