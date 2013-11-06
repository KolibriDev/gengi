module.exports = {
  dev: {
    files: [
      {
        expand: true,
        cwd: 'app/img/',
        src: ['**/*.{png,jpg,jpeg}'],
        dest: 'dev/app/img/'
      }
    ]
  },
  dist: {
    files: [
      {
        expand: true,
        cwd: 'app/img/',
        src: ['**/*.{png,jpg,jpeg}'],
        dest: 'dist/app/img/'
      }
    ]
  }
}