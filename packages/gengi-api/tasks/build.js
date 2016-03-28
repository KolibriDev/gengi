'use strict'

module.exports = (gulp) => {
  gulp.task('rebuild', ['clean'], () => gulp.start('build'))
  gulp.task('build', () => gulp.start('babel', 'config'))
}
