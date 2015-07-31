process.env.NODE_ENV = 'testing';

var fs = require('fs');

describe('Endpoints',function(){
  require('fs').readdirSync('./endpoints/').forEach(function(file) {
    if (file.indexOf('.test') > -1) {
      if(fs.existsSync('./endpoints/' + file)){
        require('./endpoints/' + file);
      }
    }
  });
});

describe('Helpers',function(){
  require('fs').readdirSync('./helpers/').forEach(function(file) {
    if (file.indexOf('.test') > -1) {
      if(fs.existsSync('./helpers/' + file)){
        require('./helpers/' + file);
      }
    }
  });
});
