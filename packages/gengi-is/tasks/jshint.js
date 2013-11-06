module.exports = {
  dev: {
    files: [
      {
        expand: true,
        cwd: 'app/js/',
        src: ['**/*.js', '!vendor/*'],
        dest: 'dev/js/'
      }
    ],
    options: {
      jshintrc: '.jshintrc' // Read hinting options from .jshintrc
    }
  }
};