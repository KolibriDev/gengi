module.exports = {
  dist: {
    options: {
      mangle: false
    },
    files: [{
      expand: true,
      cwd: 'dev/js',
      src: '**/*.js',
      dest: 'dist/js'
    }]
  }
};