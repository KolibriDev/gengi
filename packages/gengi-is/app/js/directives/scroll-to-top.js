(function() {
  define(['app'], function(app) {
    app.directive('scrollToTop', function() {
      return {
        restrict: 'A',
        link: function(scope, element) {
          element.bind('click', function() {
            function scrollTo(element, to, duration) {
              if (duration < 0) return;
              var difference = to - element.scrollTop;
              var perTick = difference / duration * 10;

              setTimeout(function() {
                element.scrollTop = element.scrollTop + perTick;
                scrollTo(element, to, duration - 10);
              }, 10);
            }
            setTimeout(function() {
              scrollTo(document.body,0,300);
            },1000);
          });
        }
      };
    });
  });
}).call(this);
