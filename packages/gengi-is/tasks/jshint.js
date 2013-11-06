module.exports = {
  dev: {
    files: [
      {
        expand: true,
        cwd: 'app/js/',
        src: ['**/*.js'],
        dest: 'dev/js/'
      }
    ],
    options: {
      jshintrc: '.jshintrc' // Read hinting options from .jshintrc
    }
  }
};