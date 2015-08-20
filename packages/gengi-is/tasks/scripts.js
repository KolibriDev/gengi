'use strict';

module.exports = function(gulp) {
  var jsDir = gulp.cfg.env.dir + gulp.cfg.scripts.subDir;
  var amdOptimize = require('amd-optimize');
  var vendorFilter = gulp.plugin.filter(gulp.cfg.scripts.vendorFilter);

  gulp.task('scripts', ['jshint'], function() {
    return gulp.src(gulp.cfg.scripts.src)
      .pipe ( gulp.plugin.plumber() )

      .pipe ( vendorFilter )
        .pipe ( gulp.plugin.debug({title:'vendor:'}) )
        .pipe ( gulp.dest( jsDir ) )
      .pipe ( vendorFilter.restore() )

      .pipe ( gulp.plugin.filter(gulp.cfg.scripts.babel.filter) )
        // Run through babel.js
        .pipe ( gulp.plugin.debug({title:'!babel:'}) )
        .pipe ( gulp.plugin.sourcemaps.init() )
        .pipe ( gulp.plugin.babel(gulp.cfg.scripts.babel.config) )
        // Optimize for amd and concatenate
        .pipe ( amdOptimize('main') )
        .pipe ( gulp.plugin.concat('main.js') )

      .pipe ( gulp.plugin.debug({title:'output:'}) )
      .pipe ( gulp.dest( jsDir ) )
      .pipe ( gulp.plugin.util.env.prod ? gulp.plugin.util.noop() : gulp.plugin.connect.reload() );
  });
};
