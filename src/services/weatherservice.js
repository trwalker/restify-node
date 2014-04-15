'use strict';

module.exports = function(jsonClientService) { 
  return (function(jsonClientService) {

   	global.weather = global.weather || {};
   	global.weather.url = global.weather.url || 'http://api.worldweatheronline.com';
   	global.weather.pathFormat = global.weather.pathFormat || '/free/v1/weather.ashx?q={0}&format=json&num_of_days=1&key=e8ky4rbwxedqmgmtbkgtqpdb';
  	global.weather.postalCodeCachedData = global.weather.postalCodeCachedData || {};

  	var weatherPostalCode;

  	function getWeatherData(postalCode) {
  		weatherPostalCode = postalCode;

  		var cachedWeatherData = weather.postalCodeCachedData[weatherPostalCode];

			if(cachedWeatherData) {
				return Q.fcall(function () {
    			return cachedWeatherData;
				});
			}
			else {
				var path = weather.pathFormat.replace('{0}', weatherPostalCode);
				return jsonClientService.get(weather.url, path).then(weatherServiceSuccess, weatherServiceError);
			}
		}

		function weatherServiceSuccess(rawWeatherData) {
			var weatherData;

			if(rawWeatherData && rawWeatherData.data && rawWeatherData.data.current_condition) {
				weatherData = require('../models/weatherdata')();
				weatherData.tempF = rawWeatherData.data.current_condition[0].temp_F;
				weatherData.tempC = rawWeatherData.data.current_condition[0].temp_C;
				weatherData.humidity = rawWeatherData.data.current_condition[0].humidity;

				weather.postalCodeCachedData[weatherPostalCode] = weatherData;
			}
			else {
				weatherData = weatherServiceError(rawWeatherData);
			}

			return weatherData;
		}

		function weatherServiceError(rawWeatherData) {
			var weatherData = require('../models/weatherdata')();
			weatherData.tempF = '0';
			weatherData.tempC = '0';
			weatherData.humidity = '0';

			return weatherData;
		}

		return {
			getWeather: getWeatherData
		};

	})(jsonClientService);
};