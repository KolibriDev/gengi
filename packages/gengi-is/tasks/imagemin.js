module.exports = {
  dev: {
    files: [
      {
        expand: true,
        cwd: 'app/img/',
        src: ['**/*.{png,jpg,gif,jpeg}'],
        dest: 'dev/img/'
      }
    ]
  },
  dist: {
    files: [
      {
        expand: true,
        cwd: 'app/img/',
        src: ['**/*.{png,jpg,gif,jpeg}'],
        dest: 'dist/img/'
      }
    ]
  }
};