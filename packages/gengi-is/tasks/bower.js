var path = require('path');

module.exports = {
  install: {
    options: {
      targetDir: './app/',
      install: true,
      verbose: true,
      cleanTargetDir: false,
      cleanBowerDir: false,
      layout: function(type, component) {
        var renamedType = type;
        if (type == 'js') renamedType = 'js/vendor';
        else if (type == 'css' || type == 'scss') renamedType = 'scss/vendor';
        return path.join(renamedType);
      }
    }
  }
};