
var gulp = require('gulp');

// Attach plugins and config to gulp object, simply to have it globally accessible
gulp.plugin = require('gulp-load-plugins')();
gulp.cfg = require('./blender.json');
gulp.cfg.env.dir = gulp.plugin.util.env.prod ? gulp.cfg.env.production.dir : gulp.cfg.env.development.dir;

var loadTasks = require('gulp-load')(gulp);
loadTasks(__dirname);

process.on('uncaughtException', function (err) {
  if (err) {
    var gutil = gulp.plugin.util;
    gutil.beep();
    gutil.log(gutil.colors.red('--- Uncaught Exception ---'));
    gutil.log(gutil.colors.yellow(err));
    gutil.log(gutil.colors.red('--- -------- --------- ---'));

    require('node-notifier').notify({
      title: err.name + ' in plugin ' + err.plugin,
      message: err.message,
    });
  }
});
