'use strict';

module.exports = function(gulp) {
  var historyFallback = require('connect-history-api-fallback');
  gulp.task('connect', function() {
    return gulp.plugin.connect.server({
      root: [gulp.cfg.env.dir],
      port: gulp.cfg.connect.port,
      livereload: gulp.cfg.connect.livereload,

      middleware: function() {
        return [ historyFallback() ];
      }
    });
  });
};
