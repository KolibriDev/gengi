module.exports = {
  dev: {
    files: [
      {
        expand: true,
        cwd: 'app/img/',
        src: ['**/*.svg'],
        dest: 'dev/img/'
      }
    ]
  },
  dist: {
    files: [
      {
        expand: true,
        cwd: 'app/img/',
        src: ['**/*.svg'],
        dest: 'dist/img/'
      }
    ]
  },
};