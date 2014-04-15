describe('WeatherService Tests', function() {
	
	var jsonClientService;
	var weatherService;

	beforeEach(function() {
		jsonClientService = require('../../src/services/jsonclientservice')();
		weatherService = require('../../src/services/weatherservice')(jsonClientService);
	});

	describe('getWeather()', function(){

		it('is a function', function() {
			expect(weatherService.getWeather).to.be.a('function');
		});

		it('calls jsonClientService.get()', function() {
			sinon.stub(jsonClientService, 'get').returns(Q.fcall(function () {
    		return { data: { current_condition: [ { temp_F: '100', temp_C: '70', humidity: '10' } ] } };
			}));
			
			weatherService.getWeather('85260').then(function(weatherData) {
				expect(jsonClientService.get.called).to.equal(true);
				expect(jsonClientService.get.callCount).to.equal(1);
			});
		});

	});
});