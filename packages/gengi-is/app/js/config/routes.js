(function() {
  define(['app','controllers/listCtrl', 'controllers/aboutCtrl', 'controllers/calcCtrl'], function(app) {
    app.config(function($routeProvider) {

      $routeProvider.when('/', {
        controller: 'listCtrl',
        templateUrl: 'list.html'
      });

      $routeProvider.when('/about', {
        controller: 'aboutCtrl',
        templateUrl: 'about.html'
      });

      $routeProvider.when('/:currName', {
        controller: 'calcCtrl',
        templateUrl: 'calc.html'
      });
    });
  });
}).call(this);
