var express = require('express');

var http = require('http'),
    app = express();

app.set('port', process.env.PORT || 8002);

// Allow all origins
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

// Endpoints
var endpoints = {};
var normalizedPath = require('path').join(__dirname, 'routes');
require('fs').readdirSync(normalizedPath).forEach(function(fileName) {
  var endpoint = require('./routes/' + fileName);
  app.use('/' + endpoint.name, endpoint.router);
  endpoints[endpoint.name] = endpoint.docs;
});

app.get('/', function(req, res){
  var pkg = require('./package.json');
  res.send({
    version: pkg.version,
    description: pkg.description,
    endpoints: endpoints,
    bugs: pkg.bugs,
    author: pkg.author,
    contributors: pkg.contributors,
  });
});

http.createServer(app).listen(app.get('port'));

exports.app = app;
