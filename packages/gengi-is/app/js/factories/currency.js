(function() {
  define(['app'], function (app) {
    return app.factory('Currency', function($resource) {
      return $resource(
        'http://apis.is/currency/lb',
        {
          currNAme: '@currName'
        },
        {
          query: {method: 'GET', isArray: false}
        }
      );
    });
  });
}).call(this);