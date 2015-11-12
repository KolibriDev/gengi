'use strict';

module.exports = function(gulp) {
  gulp.task('manifest', function(){
    var path = gulp.cfg.envdir;
    for (var i = 0; i < gulp.cfg.manifest.src.length; i++) {
      if (gulp.cfg.manifest.src[i].indexOf('!') < 0) {
        gulp.cfg.manifest.src[i] = path + gulp.cfg.manifest.src[i];
      }
    }
    console.log(gulp.cfg.manifest);
    return gulp.src(gulp.cfg.manifest.src)
      .pipe(gulp.plugin.manifest(gulp.cfg.manifest.options))
      .pipe(gulp.dest(gulp.cfg.envdir));
  });
};
