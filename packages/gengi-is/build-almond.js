({
  allowSourceOverwrites: true,
  keepBuildDir: true,
  dir: 'dist/js',
  name: 'main',
  include: ['vendor/almond'],
  insertRequire: ['main'],
  baseUrl: './dist/js',
  mainConfigFile: 'dist/js/main.js',
  optimize: 'uglify2', // "none": No minification, "uglify": Full minification
})