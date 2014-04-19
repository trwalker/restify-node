'use strict';

module.exports = function(weatherService) {
	return (function(weatherService) {

		function handleGetRequest(req, res, next) {
			var postalCode = '';

			if(req && req.params && req.params.postalcode) {
				postalCode = req.params.postalcode;

				weatherService.getWeather(postalCode, getWeatherSuccess, getWeatherError);
			}
			else {
				res.send(400, { error: 'Route parameter "postalcode" is required /weather/:postalcode' });
				res.end();
			}
		}

		function getWeatherSuccess(weatherData) {
			res.send(weatherData);
			res.end();
		}

		function getWeatherError(weatherData) {
			res.send(404, weatherData);
			res.end();
		}

		return {
			get: handleGetRequest
		};

	})(weatherService);
};