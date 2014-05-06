'use strict';

module.exports = function() {
	return (function() {
		var di = require('di');

		// Repositories
		var JsonClientRepository = require('../repositories/http/jsonclientrepository');

		// Services
		var CacheService = require('../services/caching/cacheservice');
		var WeatherService = require('../services/weather/weatherservice');

		// Controllers
		var WeatherControllerV1 = require('../controllers/v1/weather/weathercontroller');

		function handleConfigureDependencies () {
			handleRespositoryDependencies();
			handleServiceDependencies();
			handleControllerDependencies();
		}

		function handleRespositoryDependencies() {

		}

		function handleServiceDependencies() {
			di.annotate(WeatherService, new di.Inject(CacheService, JsonClientRepository));
		}

		function handleControllerDependencies() {
			di.annotate(WeatherControllerV1, new di.Inject(WeatherService));
		}

		return {
			configureDependencies: handleConfigureDependencies
		};
	})();
};