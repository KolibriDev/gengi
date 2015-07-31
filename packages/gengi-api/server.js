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
var currency = require('./endpoints/currency');
app.get('/currency/:code?', currency.getCurrencies);
app.get('/currency/search/:term', currency.findCurrencies);

http.createServer(app).listen(app.get('port'));

exports.app = app;
