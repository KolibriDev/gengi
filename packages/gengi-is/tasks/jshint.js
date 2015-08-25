'use strict';

module.exports = function(gulp) {
  // var filtered = gulp.plugin.filter(['**/*.js','!**/vendor/**/*'], {restore:true});

  gulp.task('jshint', function() {
    return gulp.src(gulp.cfg.scripts.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )

      // .pipe ( gulp.plugin.filter(gulp.cfg.scripts.babel.filter) )
      // Run through babel.js
      // .pipe ( filtered )
        .pipe ( gulp.plugin.babel(gulp.cfg.scripts.babel.config) )
      // .pipe ( filtered.restore )
      // Run through JSHint
      .pipe ( gulp.plugin.debug({title:'jshint:'}) )
      .pipe ( gulp.plugin.jshint(gulp.cfg.scripts.lint.config) )
      .pipe ( gulp.plugin.jshint.reporter('fail') );
  });
};
