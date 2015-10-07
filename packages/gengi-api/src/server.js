import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import fs from 'fs';

let app = express();

app.set('port', process.env.PORT || 8002);
app.use( cors() );

// Endpoints
let endpoints = {};
let normalizedPath = path.join(__dirname, 'routes');
fs.readdirSync(normalizedPath).forEach((fileName) => {
  let endpoint = require('./routes/' + fileName);
  app.use('/' + endpoint.name, endpoint.router);
  endpoints[endpoint.name] = endpoint.docs;
});

app.get('/', function(req, res){
  let pkg = require(path.join(__dirname, 'package.json'));
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
