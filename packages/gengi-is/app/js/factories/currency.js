(function() {
  define(['app'], function (app) {
    return app.factory('Currency', function($resource) {
      var Currency = $resource(
        'http://api02.gengi.is/currency/:currName',
        {
          currName: '@currName'
        },
        {
          get: {
            cache: true,
            method: 'GET'
          }
        }
      );

      return Currency;
    });
  });
}).call(this);
