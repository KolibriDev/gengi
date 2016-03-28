'use strict'

const gulp = require('gulp')
const path = require('path')

gulp.plugin = require('gulp-load-plugins')()

gulp.cfg = require('../../gulp-config.json')
gulp.cfg.env = gulp.cfg.envdir.hasOwnProperty(gulp.plugin.util.env.env) ? gulp.plugin.util.env.env : gulp.cfg.defaultEnv
gulp.cfg.envdir = gulp.cfg.envdir[gulp.cfg.env]

const loadTasks = require('gulp-load')(gulp)
loadTasks(path.resolve(`${__dirname}/../..`))

describe('Task runner', () => {
  it('should have a babel task ', () => {
    expect(gulp.hasTask('babel')).toBe(true)
  })
  it('should have a build task ', () => {
    expect(gulp.hasTask('build')).toBe(true)
  })
  it('should have a clean task ', () => {
    expect(gulp.hasTask('clean')).toBe(true)
  })
  it('should have a config task ', () => {
    expect(gulp.hasTask('config')).toBe(true)
  })
  it('should have a default task ', () => {
    expect(gulp.hasTask('default')).toBe(true)
  })
  it('should have a lint task ', () => {
    expect(gulp.hasTask('lint')).toBe(true)
  })
})
