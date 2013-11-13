module.exports = {
  jade: {
    files: ['app/views/**/*.jade'],
    tasks: ['buildViews']
  },
  sass: {
    files: ['app/css/**/*.scss'],
    tasks: ['buildCss']
  },
  img: {
    files: ['app/img/**/*.{jpg,png,gif,jpeg,ico}'],
    tasks: ['minifyImages']
  },
  webfonts: {
    files: ['app/fonts/**.{eof,woff,ttf}'],
    tasks: ['copyFiles']
  },
  javascript: {
    files: ['app/js/**/*.js'],
    tasks: ['buildJs', 'copyFiles']
  },
  ico: {
    files: ['app/img/**/*.ico'],
    tasks: ['copyFiles']
  },
  dev: {
    files: [
      'dev/css/**/*.css',
      'dev/**/*.html',
      'dev/img/**/*.{png,jpg,jpeg,gif,svg}',
      'dev/js/**/*.js'
    ],
    options: {
      livereload: true
    }
  }
};