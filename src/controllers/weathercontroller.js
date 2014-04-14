'use strict';

module.exports = function(weatherService) {
	return (function(weatherService) {

		function handleGetRequest(req, res, next) {
			weatherService.getWeather().then(function(weatherData) {
				res.send(weatherData);
  			next();	
			});
		}

		return {
			get: handleGetRequest
		};

	})(weatherService);
};