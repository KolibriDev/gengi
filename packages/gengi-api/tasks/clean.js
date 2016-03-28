'use strict'

module.exports = (gulp) => {
  const del = require('del')
  gulp.task('clean', () => del([gulp.cfg.envdir]))
}
