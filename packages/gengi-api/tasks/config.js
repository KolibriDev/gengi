'use strict';

module.exports = function(gulp) {
  gulp.task('config', function() {
    return gulp.src(gulp.cfg.config.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )

      .pipe ( gulp.dest( gulp.cfg.env.dir ) );
  });
};
