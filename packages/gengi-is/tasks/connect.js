var modRewrite = require('connect-modrewrite');

module.exports = {
  dev: {
    options: {
      hostname: '0.0.0.0',
      port: 8000,
      base: 'dev',
      livereload: {
        options: {
          open: true,
          base: 'dev'
        }
      },
      middleware: function (connect, options) {
        return [
          modRewrite([
            '!\\.html|\\.js|\\.css|\\.png$ /index.html [L]'
          ]),
          connect.static(require('path').resolve(options.base))
        ];
      }
    },
  }
};