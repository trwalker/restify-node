'use strict';

module.exports = function() { 
  return (function() {

  	var cachedData = null;

  	function getWeatherData() {
			if(cachedData !== null) {
				return getCacheData();
			}
			else {
				return getDataFromHttpRequest().then(processWeatherData);
			}
		}

		function processWeatherData(rawWeatherData) {
			var weatherData = require('../models/weatherdata')();
			weatherData.tempF = rawWeatherData.data.current_condition[0].temp_F;
			weatherData.tempC = rawWeatherData.data.current_condition[0].temp_C;
			weatherData.humidity = rawWeatherData.data.current_condition[0].humidity;

			cachedData = weatherData;

			return weatherData;
		}

  	function getCacheData() {
  		return Q.fcall(function () {
    		return cachedData;
			});
  	}

  	function getDataFromHttpRequest() {
  		var deferred = Q.defer();

  		var client = restify.createJsonClient({
  			url: 'http://api.worldweatheronline.com'
			});
			
			client.get('/free/v1/weather.ashx?q=85260&format=json&num_of_days=1&key=e8ky4rbwxedqmgmtbkgtqpdb', function(err, req, res, obj) {
			  if(err) {
					deferred.reject(err);
			  }
			  else {
			  	deferred.resolve(obj);
			  }
			});
			
			return deferred.promise;
  	}

		return {
			getWeather: getWeatherData
		};

	})();
};