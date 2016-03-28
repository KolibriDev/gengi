'use strict'

module.exports = (gulp) => {
  gulp.task('config', () => gulp.src(gulp.cfg.config.src)
    .pipe(gulp.plugin.plumber({ errorHandler: gulp.plugin.notify.onError('<%= error.message %>') }))
    .pipe(gulp.dest(gulp.cfg.envdir))
  )
}
