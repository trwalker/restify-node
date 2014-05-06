'use strict';

var WeatherController = function(weatherService) {
	this.weatherService = weatherService;
};

(function(WeatherController) {

	var getWeatherSuccess = function(res, weatherData) {
		res.send(weatherData);
		res.end();
	};

	var getWeatherError = function(res, weatherData) {
		res.send(404, weatherData);
		res.end();
	};
	
	WeatherController.prototype = {
		registerRoutes: function(server) {
			var weatherController = this;

			server.get('v1/weather/:zipcode', function(req, res, next) {
				weatherController.getWeatherZipCode(req, res, next);		
			});
		},
		getWeatherZipCode: function(req, res, next) {
			var zipCode = '';

			if(req && req.params && req.params.zipcode) {
				zipCode = req.params.zipcode;

				this.weatherService.getWeatherByZipCode(zipCode, 
																					 			function(weatherData) { getWeatherSuccess(res, weatherData); }, 
																					 			function(weatherData) { getWeatherError(res, weatherData); });
			}
			else {
				res.send(400, { error: 'Route parameter "zipcode" is required' });
				res.end();
			}
		}
	};

})(WeatherController);

module.exports = WeatherController;