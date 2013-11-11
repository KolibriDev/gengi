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
  require('load-grunt-tasks')(grunt);

  // Views
  grunt.registerTask('buildViews', ['jade:dev']);

  // Image minification
  grunt.registerTask('minifyImages', ['imagemin:dev', 'svgmin:dev']);

  // Sass compilation
  grunt.registerTask('buildCss', ['sass:dev']);

  // Javascript
  grunt.registerTask('buildJs', ['jshint:dev']);

  // Copy files
  grunt.registerTask('copyFiles', ['copy:dev']);

  // Run the development web server
  grunt.registerTask('runServer', ['connect:dev', 'open:dev']);

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

  grunt.registerTask('dist',
    [
      'jade:dist',
      'imagemin:dist',
      'svgmin:dist',
      'cssmin:dist',
      'uglify:dist',
      'sass:dist',
      'copy:dist'
    ]
  );

  // The server task
  grunt.registerTask('server', ['default', 'runServer', 'watch']);
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
