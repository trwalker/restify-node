'use strict';

module.exports = function(jsonClientRepository) { 
  return (function(jsonClientRepository) {

   	global.weather = global.weather || {};
   	global.weather.url = global.weather.url || 'http://api.worldweatheronline.com';
   	global.weather.pathFormat = global.weather.pathFormat || '/free/v1/weather.ashx?q={0}&format=json&num_of_days=1&key=e8ky4rbwxedqmgmtbkgtqpdb';
  	global.weather.postalCodeCachedData = global.weather.postalCodeCachedData || {};

  	function getWeatherByZipCodeHandler(zipCode, success, error) {
  		if(!isInputValid(zipCode, success, error)) {
  			weatherServiceError(error);
			}
			else {
	  		var cachedWeatherData = weather.postalCodeCachedData[zipCode];

				if(cachedWeatherData) {
					success(cachedWeatherData);
				}
				else {
					var path = weather.pathFormat.replace('{0}', zipCode);
					
					jsonClientRepository.get(weather.url, 
																	 path,
																	 null,	
																	 function(res, obj) { weatherServiceSuccess(zipCode, obj, success, error); }, 
																	 function(res, err) { weatherServiceError(error); });
				}
  		}
		}

		function isInputValid(zipCode, success, error) {
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
		}

		function weatherServiceSuccess(postalCode, rawWeatherData, success, error) {
			var weatherData;

			if(rawWeatherData && rawWeatherData.data && rawWeatherData.data.current_condition) {
				weatherData = require('../../models/weatherdata')();
				weatherData.tempF = rawWeatherData.data.current_condition[0].temp_F;
				weatherData.tempC = rawWeatherData.data.current_condition[0].temp_C;
				weatherData.humidity = rawWeatherData.data.current_condition[0].humidity;

				weather.postalCodeCachedData[postalCode] = weatherData;

				success(weatherData);
			}
			else {
				weatherServiceError(error);
			}
		}

		function weatherServiceError(error) {
			var weatherData = require('../../models/weatherdata')();
			weatherData.tempF = '0';
			weatherData.tempC = '0';
			weatherData.humidity = '0';

			error(weatherData);
		}

		return {
			getWeatherByZipCode: getWeatherByZipCodeHandler
		};

	})(jsonClientRepository);
};