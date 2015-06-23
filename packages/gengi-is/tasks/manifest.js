'use strict';

module.exports = function(gulp) {
  gulp.task('manifest', function(){
    var path = gulp.cfg.env.dir;
    for (var i = 0; i < gulp.cfg.manifest.src.length; i++) {
      if (gulp.cfg.manifest.src[i].indexOf('!') < 0) {
        gulp.cfg.manifest.src[i] = path + gulp.cfg.manifest.src[i];
      }
    }
    return gulp.src(gulp.cfg.manifest.src)
      .pipe(gulp.plugin.manifest({
        hash: true,
        // timestamp: true,
        preferOnline: true,
        network: gulp.cfg.manifest.network,
        filename: gulp.cfg.manifest.filename,
        exclude: gulp.cfg.manifest.exclude,
      }))
      .pipe(gulp.dest(path));
  });
};
