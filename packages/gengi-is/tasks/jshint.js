'use strict';

module.exports = function(gulp) {
  var gutil = gulp.plugin.util;
  var map = require('map-stream');
  var notifier = require('node-notifier');
  var jsHintReporter = map(function (file, callback) {
    if (!file.jshint.success) {
      file.jshint.results.forEach(function (err) {
        if (err) {
          notifier.notify({
            title: 'JSHint: ' + err.file.split('/').pop(),
            subtitle: 'Line:' + err.error.line + '/Char:' + err.error.character + ' » ' + err.error.reason,
            message: err.error.evidence
          });
          gulp.plugin.util.beep();
          gutil.log(gutil.colors.red('JSHint') + gutil.colors.yellow(' failed on file: ' + err.file));
          gutil.log(gutil.colors.yellow('Line: ' + err.error.line + ' / Character: ' + err.error.character));
          gutil.log(gutil.colors.yellow('Reason: ' + err.error.reason));
          gutil.log(gutil.colors.yellow(err.error.evidence));
        }
      });
    }
    callback(null, file);
  });

  gulp.task('jshint', function() {
    return gulp.src(gulp.cfg.scripts.src)
      .pipe ( gulp.plugin.plumber() )

      .pipe ( gulp.plugin.filter(gulp.cfg.scripts.babel.filter) )
      // Run through babel.js
      .pipe ( gulp.plugin.sourcemaps.init() )
      .pipe ( gulp.plugin.babel(gulp.cfg.scripts.babel.config) )
      // Run through JSHint
      .pipe ( gulp.plugin.debug({title:'jshint:'}) )
      .pipe ( gulp.plugin.jshint(gulp.cfg.scripts.lint.config) )
      .pipe ( jsHintReporter );
  });
};