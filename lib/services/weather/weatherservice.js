'use strict';

var WeatherService = function(cacheService, jsonClientRepository) {
 	this.cacheService = cacheService;
	this.jsonClientRepository = jsonClientRepository;
};

(function (WeatherService) {
	
	var cacheNamespace = 'services.weatherservice.zipcodecache';
	var serviceBaseUrl = 'http://api.worldweatheronline.com';
 	var pathFormat = '/free/v1/weather.ashx?q={0}&format=json&num_of_days=1&key=e8ky4rbwxedqmgmtbkgtqpdb';

	var isInputValid = function(zipCode, success, error) {
		var valid = false;

		if(!success) {
			throw 'Argument exception, "success" callback is required';
		}

		if(!error) {
			throw 'Argument exception, "error" callback is required';
		}

		if(zipCode && zipCode.length > 0) {
			valid = true;
		}

		return valid;
	};

	var weatherServiceSuccess = function(cacheService, zipCode, rawWeatherData, success, error) {
		var weatherData;

		if(rawWeatherData && rawWeatherData.data && rawWeatherData.data.current_condition) {
			weatherData = require('../../models/weatherdata')();
			weatherData.tempF = rawWeatherData.data.current_condition[0].temp_F;
			weatherData.tempC = rawWeatherData.data.current_condition[0].temp_C;
			weatherData.humidity = rawWeatherData.data.current_condition[0].humidity;

			cacheService.set(cacheNamespace, zipCode, weatherData);

			success(weatherData);
		}
		else {
			weatherServiceError(error);
		}
	};

	var weatherServiceError = function(error) {
		var weatherData = require('../../models/weatherdata')();
		weatherData.tempF = '0';
		weatherData.tempC = '0';
		weatherData.humidity = '0';

		error(weatherData);
	};

	WeatherService.prototype = {
		getWeatherByZipCode: function(zipCode, success, error) {
			if(!isInputValid(zipCode, success, error)) {
				weatherServiceError(error);
			}
			else {
				var cachedWeatherData = this.cacheService.get(cacheNamespace, zipCode, null);

				if(cachedWeatherData) {
					success(cachedWeatherData);
				}
				else {
					var path = pathFormat.replace('{0}', zipCode);
					var cacheService = this.cacheService;

					this.jsonClientRepository.get(serviceBaseUrl, 
																				path,
																				null,	
																				function(res, obj) { weatherServiceSuccess(cacheService, zipCode, obj, success, error); }, 
																				function(res, err) { weatherServiceError(error); });
				}
			}
		},
	};

})(WeatherService);

module.exports = WeatherService;