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

fs.readdirSync( path.join(__dirname, 'routes') ).forEach((fileName) => {
  let {name, router, docs} = require('./routes/' + fileName);
  app.use('/' + name, router);
  app.use('/v2/' + name, router);
  endpoints[name] = docs;
});

let rootResponse = function(req, res){
  let {
    version, description, bugs, author, contributors
  } = require(path.join(__dirname, 'package.json'));
  res.send({
    version: version,
    description: description,
    endpoints: endpoints,
    bugs: bugs,
    author: author,
    contributors: contributors,
  });
};

app.get('/', rootResponse);
app.get('/v2', rootResponse);

http.createServer(app).listen(app.get('port'));

export default app;
