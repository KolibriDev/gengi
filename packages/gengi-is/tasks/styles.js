'use strict';

module.exports = function(gulp) {
  gulp.task('styles', function() {
    var gutil = gulp.plugin.util,
        env  = gutil.env.env,
        stage  = env === 'stage',
        prod  = env === 'production';

    gulp.src(gulp.cfg.styles.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )

      .pipe ( gulp.plugin.sass({ outputStyle: (stage || prod ? 'compressed' : 'nested') }) )
      .pipe ( gulp.plugin.autoprefixer(gulp.cfg.styles.autoprefixer) )
      .pipe ( gulp.dest(gulp.cfg.env.dir + gulp.cfg.styles.subDir) )

      .pipe ( stage || prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};
