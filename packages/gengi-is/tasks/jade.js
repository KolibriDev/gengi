module.exports = {
  dev: {
    options: {
      pretty: true
    },
    files: [
      {
        expand: true,
        cwd: 'app/views/',
        src: ['*.jade'],
        dest: 'dev/',
        ext: '.html'
      }
    ]
  },
  dist: {
    files: [
      {
        expand: true,
        cwd: 'app/views/',
        src: ['*.jade'],
        dest: 'dist/',
        ext: '.html'
      }
    ]
  }
}