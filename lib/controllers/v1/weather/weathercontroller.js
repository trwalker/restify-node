'use strict';

var WeatherController = function(weatherService) {
	this.weatherService = weatherService;
};

WeatherController.registerRoutes = function(server) {
	var WeatherController = this;

	server.get('v1/weather/:zipcode', function(req, res, next) {
		var weatherController = req.injector.get(WeatherController);
		weatherController.getWeatherZipCode(req, res, next);		
	});
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