'use strict';

module.exports = function(weatherService) {
	return (function(weatherService) {

		function handleRegisterRoutes(server) {
			server.get('v1/weather/:zipcode', function(req, res, next) {
				handleGetWeatherZipCode(req, res, next);		
			});
		}

		function handleGetWeatherZipCode(req, res, next) {
			var zipCode = '';

			if(req && req.params && req.params.zipcode) {
				zipCode = req.params.zipcode;

				weatherService.getWeatherByZipCode(zipCode, 
																					 function(weatherData) { getWeatherSuccess(res, weatherData); }, 
																					 function(weatherData) { getWeatherError(res, weatherData); });
			}
			else {
				res.send(400, { error: 'Route parameter "zipcode" is required' });
				res.end();
			}
		}

		function getWeatherSuccess(res, weatherData) {
			res.send(weatherData);
			res.end();
		}

		function getWeatherError(res, weatherData) {
			res.send(404, weatherData);
			res.end();
		}

		return {
			registerRoutes: handleRegisterRoutes,
			getWeatherZipCode: handleGetWeatherZipCode
		};

	})(weatherService);
};