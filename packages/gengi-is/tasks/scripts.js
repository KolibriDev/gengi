'use strict';

module.exports = function(gulp) {
  var gutil = gulp.plugin.util,
      env  = gutil.env.env,
      stage  = env === 'stage',
      prod  = env === 'production';

  var amdOptimize = require('amd-optimize');
  var eventStream = require('event-stream');
  // var filtered = gulp.plugin.filter(['**/*.js','!**/vendor/**/*'], {restore:true});

  gulp.task('scripts', function() {
    gulp.src(gulp.cfg.scripts.vendorSrc)
      .pipe ( gulp.plugin.debug({title:'vendor:'}) )
      .pipe ( gulp.dest( gulp.cfg.env.dir + gulp.cfg.scripts.subDir ) );
    var almondStream = gulp.src(gulp.cfg.scripts.almondSrc);
    var scriptStream = gulp.src(gulp.cfg.scripts.src)
        .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )

        // Run through babel.js
        // .pipe ( gulp.plugin.debug({title:'script:'}) )

        // .pipe ( filtered )
          .pipe ( gulp.plugin.debug({title:'--babel:'}) )
          .pipe ( gulp.plugin.babel(gulp.cfg.scripts.babel.config) )
        // .pipe ( filtered.restore )

        // Optimize for amd and concatenate
        // .pipe ( gulp.plugin.sourcemaps.init() )
        .pipe ( amdOptimize('main') )
        .pipe ( gulp.plugin.concat('main.js') );
        // .pipe ( gulp.plugin.sourcemaps.write());

    eventStream.merge(
      almondStream,
      scriptStream
    ) .pipe ( gulp.plugin.order(['**/almond.js', '**/main.js']) )
      .pipe ( gulp.plugin.concat('main.js') )

      .pipe ( gulp.plugin.debug({title:'output:'}) )
      .pipe ( gulp.dest( gulp.cfg.env.dir + gulp.cfg.scripts.subDir ) )
      .pipe ( stage || prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};
