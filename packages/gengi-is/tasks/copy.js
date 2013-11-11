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
      },
      // Ico files
      {
        expand: true,
        cwd: 'app/img',
        src: '**/*.ico',
        dest: 'dev/img'
      }
    ]
  },
  dist: {
    files: [
      // Webfonts
      {
        expand: true,
        cwd: 'app/fonts',
        src: '**',
        dest: 'dist/fonts'
      },
      // Ico files
      {
        expand: true,
        cwd: 'app/img',
        src: '**/*.ico',
        dest: 'dist/img'
      }
    ]
  }
};