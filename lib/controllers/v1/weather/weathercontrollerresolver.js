'use strict';

module.exports = function() {
	return (function() {
	
		function resolveControllerHandler() {
			var jsonClientRepository = require('lib/repositories/http/jsonclientrepository')();
	    var weatherService = require('lib/services/weather/weatherservice')(jsonClientRepository);
			var weatherController = require('lib/v1/controllers/weathercontroller')(weatherService);	

	  	return weatherController;
		}

		return {
			resolveController: resolveControllerHandler
		};

	})();
}