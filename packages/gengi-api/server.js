var express = require('express');

var http = require('http'),
    path = require('path'),
    app = express();

app.set('port', process.env.PORT || 8001);

// Allow all origins
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Endpoints
var currency = require('./endpoints/currency');
app.get('/currency', currency.getCurrencies);
app.get('/currency/:name', currency.getCurrency);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
