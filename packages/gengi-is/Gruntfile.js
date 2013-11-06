module.exports = function(grunt) {

  // Show tasks time
  require('time-grunt')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };

  // Load all tasks under the tasks folder
  grunt.util._.extend(config, loadConfig('./tasks/'));
  grunt.initConfig(config);


  // Views
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.registerTask('buildViews', ['jade:dev']);

  // Image minification
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.registerTask('minifyImages', ['imagemin:dev', 'svgmin:dev']);

  // Sass compilation
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('buildCss', ['sass:dev']);

  // Javascript
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('buildJs', ['jshint:dev']);

  // Copy files
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('copyFiles', ['copy:dev']);

  // Run the development web server
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.registerTask('runServer', ['connect:dev', 'open:dev'])

  // Watch for file changes
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('watchFiles', ['watch'])

  // Native notifications when tasks fail
  grunt.loadNpmTasks('grunt-notify');

  grunt.loadNpmTasks('grunt-bower-task');

  // The default task
  grunt.registerTask('default',
    [
      'buildViews',
      'minifyImages',
      'buildCss',
      'buildJs',
      'copyFiles'
    ]
  );

  // The server task
  grunt.registerTask('server', ['default', 'runServer', 'watchFiles'])
};

// Borrowed from Thomas Boyt (@thomasABoyt)
// More: http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
}
