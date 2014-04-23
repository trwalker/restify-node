'use strict';

module.exports = function(server, fs) {
  
  server.use(function(req, res, next) {
  	res.setHeader('content-type', 'application/json');
  	res.charSet('utf-8');
  	next();
  });

  server.on('uncaughtException', function (req, res, route, err) { 
    var errorController = require('./lib/controllers/v1/error/errorcontroller')();

  	errorController.error(req, res, route, err);
  });

  var routeResolver = require('./lib/routeresolver')(server, fs);
  routeResolver.registerRoutes();
  
};