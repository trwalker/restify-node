'use strict';

module.exports = function() {
	return (function() {

		var restify = require('restify');
		var server = restify.createServer();
		var fs = require('fs');

		function handleConfigure(ipAddress, port) {
			configureBodyParser();
			configureResponseHeaders();
			configureErrorHandling();
			require('./appconfig')();
			require('./routeconfig')(server, fs).configureRoutes();
			startServer(ipAddress, port);
		}

		function configureBodyParser() {
			server.use(restify.bodyParser({ mapParams: false }));
		}

		function configureResponseHeaders() {
			server.use(function(req, res, next) {
				res.setHeader('content-type', 'application/json');
  			res.charSet('utf-8');
  			next();
  		});
		}

		function configureErrorHandling() {
			server.on('uncaughtException', function (req, res, route, err) { 
		    var errorController = require('../controllers/v1/error/errorcontroller')();

		  	errorController.error(req, res, route, err);
		  });
		}

		function startServer(ipAddress, port) {
			server.listen(port, ipAddress, function() {
				console.log('%s listening at %s', server.name, server.url);
			});
		}

		return {
			configure: handleConfigure
		};

	})();
};