'use strict';

module.exports = function(gulp) {
  gulp.task('styles', function() {
    var gutil = gulp.plugin.util,
        prod  = gutil.env.prod;

    gulp.src(gulp.cfg.styles.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )

      .pipe ( gulp.plugin.sass({ outputStyle: (prod ? 'compressed' : 'nested') }) )
      .pipe ( gulp.plugin.autoprefixer(gulp.cfg.styles.autoprefixer) )
      .pipe ( gulp.dest(gulp.cfg.env.dir + gulp.cfg.styles.subDir) )

      .pipe ( prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};
