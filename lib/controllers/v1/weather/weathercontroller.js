'use strict';

var di = require('di');
var WeatherService = require('../../../services/weather/weatherservice');

var WeatherController = function(weatherService) {
	this.weatherService = weatherService;
};

WeatherController.prototype.registerRoutes = function(server) {
	var weatherController = this;

	server.get('v1/weather/:zipcode', function(req, res, next) {
		weatherController.getWeatherZipCode(req, res, next);		
	});
};

WeatherController.prototype.getWeatherZipCode = function(req, res, next) {
	var zipCode = '';

	if(req && req.params && req.params.zipcode) {
		zipCode = req.params.zipcode;

		var weatherController = this;

		this.weatherService.getWeatherByZipCode(zipCode, 
																			 			function(weatherData) { weatherController.getWeatherSuccess(res, weatherData); }, 
																			 			function(weatherData) { weatherController.getWeatherError(res, weatherData); });
	}
	else {
		res.send(400, { error: 'Route parameter "zipcode" is required' });
		res.end();
	}
};

WeatherController.prototype.getWeatherSuccess = function(res, weatherData) {
	res.send(weatherData);
	res.end();
};

WeatherController.prototype.getWeatherError = function(res, weatherData) {
	res.send(404, weatherData);
	res.end();
};

di.annotate(WeatherController, new di.Inject(WeatherService));

module.exports = WeatherController;