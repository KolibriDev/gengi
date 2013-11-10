(function() {
  define(['app', 'factories/currency'],
    function(app) {
      return app.controller('calcCtrl',
        function($rootScope, $scope, $routeParams, Currency) {

          // Parse query string
          var calcQuery = parseQuery($routeParams.currName);

          // Get currency
          Currency.get({currName: calcQuery.currName},
            function sucess(curr) {
              if(curr && curr.value && curr.shortName) {

                // Update header template
                $rootScope.headerTpl = 'calcHeader';

                $scope.currency = curr;
                $scope.fromValue = calcQuery.amount || '';
                $scope.calcRate = calcRate;

                // Header
                $rootScope.pageTitle = curr.longName + ' - Gengi.is';
                $rootScope.currencyShortName = curr.shortName;
                $rootScope.currencyLongName = curr.longName;
              } else {
                $scope.isOn404 = 1;

                $rootScope.headerTpl = 'partials/listHeader.html';
                $rootScope.pageTitle = 'Síða fannst ekki - Gengi.is';
              }


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

    if(amount === '' || amount === 1) {
      return rate.toFixed(1);
    }

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
        amount: '',
        currName: query
      };
    }
  }

}).call(this);