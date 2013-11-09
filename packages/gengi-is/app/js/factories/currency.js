(function() {
  define(['app'], function (app) {
    return app.factory('Currency', function($resource) {
      var Currency = $resource(
        'http://api.gengi.is/currency/:currName',
        {
          currName: '@currName'
        }
      );

      return Currency;
    });
  });
}).call(this);
