(function() {
  define(['app','controllers/listCtrl'], function(app) {
    app.config(function($routeProvider) {
      $routeProvider.when('/', {
        controller: 'listCtrl',
        templateUrl: 'list.html'
      });
    });
  });
}).call(this);