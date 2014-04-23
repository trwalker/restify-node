'use strict';

module.exports = function() {
	return (function() {
	
		function resolveControllerHandler() {
			var jsonClientRepository = require('../../../repositories/http/jsonclientrepository')();
	    var weatherService = require('../../../services/weather/weatherservice')(jsonClientRepository);
			var weatherController = require('./weathercontroller')(weatherService);	

	  	return weatherController;
		}

		return {
			resolveController: resolveControllerHandler
		};

	})();
}