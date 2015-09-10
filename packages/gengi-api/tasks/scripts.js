'use strict';

module.exports = function(gulp) {
  gulp.task('scripts', ['jshint'], function() {
    return gulp.src(gulp.cfg.scripts.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )

      .pipe ( gulp.dest( gulp.cfg.envdir ) );
  });
};
