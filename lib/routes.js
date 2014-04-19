'use strict';

module.exports = function(server) {
  
  server.use(function(req, res, next) {
  	res.setHeader('content-type', 'application/json');
  	res.charSet('utf-8');
  	next();
  });

  server.on('uncaughtException', function(req, res, route, err) {
  	var errorController = require('./controllers/errorcontroller');

  	errorController.error(req, res, route, err);
  });

  server.get('/weather/:postalcode', function(req, res, next) {
  	var jsonClientService = require('./services/jsonClientService')();
    var weatherService = require('./services/weatherservice')(jsonClientService);
		var weatherController = require('./controllers/weathercontroller')(weatherService);	

  	weatherController.get(req, res, next);
  });
  
};