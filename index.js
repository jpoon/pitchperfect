var express = require('express');
var morgan  = require('morgan');
var config  = require('./config');
var http    = require('http');

  var server = express();

  // log all requests to the console
  server.use(morgan('dev'));
  server.use(express.static(config.buildDir));

  // Serve index.html for all routes to leave routing up to react-router
  server.all('/*', function(req, res) {
      res.sendFile('index.html', { root: 'build' });
  });

  // Start webserver if not already running
  var s = http.createServer(server);
  s.on('error', function(err){
    if(err.code === 'EADDRINUSE'){
      gutil.log('Development server is already started at port ' + config.serverport);
    }
    else {
      throw err;
    }
  });

  s.listen(config.serverport);
