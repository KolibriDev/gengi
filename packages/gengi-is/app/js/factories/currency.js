(function() {
  define(['app'], function (app) {
    return app.factory('Currency', function($resource) {
      var Currency = $resource(
        'http://apis.is/currency/lb',
        {
          currName: '@currName'
        },
        {
          query: {method: 'GET', isArray: false}
        }
      );

      return Currency;
    });
  });
}).call(this);
