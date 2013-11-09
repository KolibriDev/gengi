(function() {
  define(['app','controllers/listCtrl', 'controllers/calcCtrl'], function(app) {
    app.config(function($routeProvider) {

      $routeProvider.when('/', {
        controller: 'listCtrl',
        templateUrl: 'list.html'
      });

      $routeProvider.when('/:currName', {
        controller: 'calcCtrl',
        templateUrl: 'calc.html'
      });
    });
  });
}).call(this);
