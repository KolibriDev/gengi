'use strict';

module.exports = function(gulp) {
  gulp.task('babel', ['jshint'], function() {
    return gulp.src(gulp.cfg.scripts.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )

      .pipe ( gulp.plugin.sourcemaps.init() )
      .pipe ( gulp.plugin.babel(gulp.cfg.scripts.babelconfig) )
      .pipe ( gulp.plugin.sourcemaps.write())

      .pipe ( gulp.dest( gulp.cfg.envdir ) );
  });
};
