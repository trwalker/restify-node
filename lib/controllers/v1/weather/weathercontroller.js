'use strict';

module.exports = function(weatherService) {
	return (function(weatherService) {
		var route = 'v1/weather/:zipcode';

		function handleRegisterRoutes(server) {
			server.get(route, function(req, res, next) {
				handleGetWeatherZipCode(req, res, next);
				res.end();
			});
		}

		function handleGetWeatherZipCode(req, res, next) {
			var zipCode = '';

			if(req && req.params && req.params.zipcode) {
				zipCode = req.params.zipcode;

				weatherService.getWeatherByZipCode(zipCode, getWeatherSuccess, getWeatherError);
			}
			else {
				res.send(400, { error: 'Route parameter "zipcode" is required ' + route });
			}
		}

		function getWeatherSuccess(weatherData) {
			res.send(weatherData);
		}

		function getWeatherError(weatherData) {
			res.send(404, weatherData);
		}

		return {
			registerRoutes: handleRegisterRoutes,
			getWeatherZipCode: handleGetWeatherZipCode
		};

	})(weatherService);
};