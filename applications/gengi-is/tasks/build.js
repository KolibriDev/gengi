'use strict';

module.exports = function(gulp) {
  gulp.task('rebuild', ['clean'], function() {
    return gulp.start('build');
  });
  gulp.task('build', function() {
    return gulp.start('scripts', 'babel', 'styles', 'templates', 'images', 'copy');
  });
};
