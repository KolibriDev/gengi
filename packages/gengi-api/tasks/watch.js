'use strict'

module.exports = (gulp) => {
  gulp.task('watch', ['build'], () => {
    gulp.watch(gulp.cfg.scripts.src, ['babel'])
    gulp.watch(gulp.cfg.config.src, ['config'])
  })
}
