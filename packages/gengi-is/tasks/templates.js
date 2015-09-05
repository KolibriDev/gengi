'use strict';

module.exports = function(gulp) {
  var gutil = gulp.plugin.util;
  var env  = gutil.env.env,
      stage  = env === 'stage',
      prod  = env === 'production';
  var options = gulp.cfg.templates.jade;
  options.data = {
    'env': env ? env : 'development',
    'flags': gutil.env
  };

  gulp.task('templates', function() {

    return gulp.src(gulp.cfg.templates.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )
      .pipe( gulp.plugin.jade(options) )

      .pipe( gulp.dest( gulp.cfg.env.dir) )
      .pipe( stage || prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });

  gulp.task('test', function() {
    console.log(gutil.env);
  });
};
