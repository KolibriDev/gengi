'use strict';

var gulp = require('gulp'),
    path = require('path');

gulp.cfg = require('../blender.json');
gulp.plugin = require('gulp-load-plugins')();
gulp.cfg.env = gulp.plugin.util.env.env || gulp.cfg.defaultEnv;
gulp.cfg.envdir = gulp.cfg.envdir.hasOwnProperty(gulp.cfg.env) ? gulp.cfg.envdir[gulp.cfg.env] : gulp.cfg.envdir['development'];

var loadTasks = require('gulp-load')(gulp);
loadTasks(path.resolve(__dirname + '/..'));

describe('Task runner', function() {
  it('should have a build task ', function() {
    expect(gulp.hasTask('build')).toBe(true);
  });
  it('should have a clean task ', function() {
    expect(gulp.hasTask('clean')).toBe(true);
  });
  it('should have a config task ', function() {
    expect(gulp.hasTask('config')).toBe(true);
  });
  it('should have a default task ', function() {
    expect(gulp.hasTask('default')).toBe(true);
  });
  it('should have a jshint task ', function() {
    expect(gulp.hasTask('jshint')).toBe(true);
  });
  it('should have a scripts task ', function() {
    expect(gulp.hasTask('scripts')).toBe(true);
  });
});
