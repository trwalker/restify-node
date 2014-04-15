'use strict';

module.exports = function(weatherService) {
	return (function(weatherService) {

		function handleGetRequest(req, res, next) {
			var postalCode = '';

			if(req && req.params && req.params.postalcode) {
				postalCode = req.params.postalcode;

				weatherService.getWeather(postalCode).done(function(weatherData) {
					res.send(weatherData);
					next();
				});
			}
			else {
				res.send(400, { error: 'Route parameter "postalcode" is required /weather/:postalcode' })
			}
		}

		return {
			get: handleGetRequest
		};

	})(weatherService);
};