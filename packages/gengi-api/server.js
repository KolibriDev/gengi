var express = require('express');

var http = require('http'),
    path = require('path'),
    app = express();

app.set('port', process.env.PORT || 8001);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Allow all origins
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Endpoints
var currency = require('./endpoints/currency');
app.get('/currency', currency.list);
app.get('/currency/:name', currency.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
