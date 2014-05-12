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
		var ErrorControllerV1 = require('../controllers/v1/error/errorcontroller');
		var WeatherControllerV1 = require('../controllers/v1/weather/weathercontroller');

		function handleConfigureDependencies () {
			handleRespositoryDependencies();
			handleServiceDependencies();
			handleControllerDependencies();
		}

		function handleRespositoryDependencies() {

		}

		function handleServiceDependencies() {
			bindNoScope(WeatherService, new di.Inject(CacheService, JsonClientRepository));
			bindSingletonScope(CacheService, new di.Inject());
			bindSingletonScope(JsonClientRepository, new di.Inject());
		}

		function handleControllerDependencies() {
			bindNoScope(ErrorControllerV1, new di.Inject());
			bindNoScope(WeatherControllerV1, new di.Inject(WeatherService));
		}

		function bindSingletonScope(object, inject) {
			di.annotate(object, inject);
		}

		function bindRequestScope(object, inject) {

		}

		function bindNoScope(object, inject) {
			di.annotate(object, inject);
			di.annotate(object, new di.TransientScope())
		}

		return {
			configureDependencies: handleConfigureDependencies
		};
	})();
};