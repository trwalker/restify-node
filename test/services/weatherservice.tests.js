describe('WeatherService Tests', function() {
	
	var weatherService;

	beforeEach(function() {
		weatherService = require('../../src/services/weatherservice')();
	});

	describe('getWeather()', function(){

		it('is a function', function() {
			expect(weatherService.getWeather).to.be.a('function');
		});

		it('validate return value', function() {
			sinon.stub(weatherService, 'getWeather').returns(Q.fcall(function () {
    		return { tempF: '100', tempC: '70', humidity: '10' };
			}));
			
			weatherService.getWeather().then(function(weatherData) {
				expect(weatherService.getWeather.called).to.equal(true);
				expect(weatherData.tempF).to.equal('100');
			});

			
		});

	});
});