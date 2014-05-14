'use strict';

module.exports = function() {
	return (function() {

		var restify = require('restify');
		var server = restify.createServer();
		var fs = require('fs');
		var di = require('di');

		function handleConfigureServer(ipAddress, port) {
			configureBodyParser();
			configureResponseHeaders();
			initializeDependencyInjector();
			require('./settingsconfig')().configureSettings();
			require('./diconfig')().configureDependencies();
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

		function initializeDependencyInjector() {
			server.use(function(req, res, next) {
				req.injector = new di.Injector([]);
  			next();
  		});	
		}

		function startServer(ipAddress, port) {
			server.listen(port, ipAddress, function() {
				console.log('%s listening at %s', server.name, server.url);
			});
		}

		return {
			configureServer: handleConfigureServer
		};

	})();
};