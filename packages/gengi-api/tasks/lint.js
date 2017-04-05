'use strict'

module.exports = function (gulp) {
  gulp.task('lint', () => gulp.src(gulp.cfg.scripts.src)
    .pipe(gulp.plugin.plumber({ errorHandler: gulp.plugin.notify.onError('<%= error.message %>') }))

    .pipe(gulp.plugin.debug({ title: '--lint-script:' }))
    .pipe(gulp.plugin.eslint(gulp.cfg.scripts.lint.config))
    .pipe(gulp.plugin.eslint.format())
    .pipe(gulp.plugin.eslint.failAfterError())
  )
}
