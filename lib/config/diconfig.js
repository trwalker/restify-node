'use strict';

module.exports = function() {
	return (function() {
		var di = require('di');
		var singletonScopeItems = [];

		// Repositories
		var JsonClientRepository = require('../repositories/http/jsonclientrepository');

		// Services
		var CacheService = require('../services/caching/cacheservice');
		var WeatherService = require('../services/weather/weatherservice');

		// Controllers
		var ErrorControllerV1 = require('../controllers/v1/error/errorcontroller');
		var WeatherControllerV1 = require('../controllers/v1/weather/weathercontroller');

		function handleConfigureDependencies (req) {
			bindSingletonScopeDependencies();
			bindRequestScopeDependencies(req);
		}

		function bindSingletonScopeDependencies() {
			if(!global.injector) {

				// Repositories
				bindSingletonScopeItem(JsonClientRepository, new di.Inject());

				// Services
				bindSingletonScopeItem(CacheService, new di.Inject());
				bindSingletonScopeItem(WeatherService, new di.Inject(CacheService, JsonClientRepository))

				global.injector = new di.Injector(singletonScopeItems);
			}
		}

		function bindRequestScopeDependencies(req) {
			req.requestScopeItems = [];

			// Controllers
			bindRequestScopeItem(req, ErrorControllerV1, new di.Inject());
			bindRequestScopeItem(req, WeatherControllerV1, new di.Inject(WeatherService));

			req.injector = global.injector.createChild(req.requestScopeItems);
		}

		function bindSingletonScopeItem(item, inject) {
			di.annotate(item, inject);
			singletonScopeItems.push(item);
		}

		function bindRequestScopeItem(req, item, inject) {
			di.annotate(item, inject);
			req.requestScopeItems.push(item);
		}

		return {
			configureDependencies: handleConfigureDependencies
		};
	})();
};
