require.config({
  baseUrl: '/js',
  config: {
    moment: { noGlobal: true },
  },
  paths: {
    vue: 'vendor/vue',
    zepto: 'vendor/zepto-build',
    promise: 'vendor/promise',
    domReady: 'vendor/domReady',
    modernizr: 'vendor/modernizr',
    swiftclick: 'vendor/swiftclick',

    moment: 'vendor/moment',
    momentIS: 'vendor/moment-is',
    momenttz: 'vendor/moment-timezone',
    momentjs: 'modules/moment',

    // Folders
    init: 'modules/init',
    mod: 'modules',
  },
  shim: {
    modernizr: { exports: 'Modernizr' },
    zepto: { exports: 'Zepto' },
  }
});

require([
  'init/gengi'
]);
