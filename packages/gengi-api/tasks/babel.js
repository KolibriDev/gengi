'use strict'

module.exports = (gulp) => {
  gulp.task('babel', ['lint'], () => gulp.src(gulp.cfg.scripts.src)
    .pipe(gulp.plugin.plumber({ errorHandler: gulp.plugin.notify.onError('<%= error.message %>') }))

    .pipe(gulp.plugin.sourcemaps.init())
    .pipe(gulp.plugin.babel())
    .pipe(gulp.plugin.sourcemaps.write())

    .pipe(gulp.dest(gulp.cfg.envdir))
  )
}
