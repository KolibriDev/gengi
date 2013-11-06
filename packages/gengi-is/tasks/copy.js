module.exports = {
  dev: {
    files: [
      // Javascript files
      {
        expand: true,
        cwd: 'app/js',
        src: '**/*.js',
        dest: 'dev/js'
      },
      // Webfonts
      {
        expand: true,
        cwd: 'app/fonts',
        src: '**',
        dest: 'dev/fonts'
      }
    ]
  }
};