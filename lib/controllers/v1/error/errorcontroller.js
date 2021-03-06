'use strict';

var ErrorController = function() {
};

ErrorController.registerRoutes = function(server) {
	var ErrorController = this;

	server.on('uncaughtException', function (req, res, route, err) { 
  	var errorController = req.injector.get(ErrorController);
  	errorController.error(req, res, route, err);
  });
};

ErrorController.prototype = {
	error: function(req, res, route, err) {
		// TODO: Handle Error Logging
		res.send(500, { errorCode: -100, message: 'oh noes, the system is down'});
		console.log('ERROR: { route: "' + route.spec.path + '" error: "' + err + '"');
	}
};

module.exports = ErrorController;