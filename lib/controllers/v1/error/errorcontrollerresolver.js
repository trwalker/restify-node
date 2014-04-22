'use strict';

module.exports = function() {
	return (function() {
	
		function resolveControllerHandler() {
			var currentWeatherController = require('lib/v1/controllers/errorcontroller')(weatherService);	

	  	return currentWeatherController;
		}

		return {
			resolveController: resolveControllerHandler
		};

	})();
}