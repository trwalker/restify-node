describe('WeatherService Tests', function() {
	
	var weatherService;

	beforeEach(function() {
		weatherService = require('../../src/services/weatherservice')();
	});

	describe('getWeather()', function(){

		it('is a function', function() {
			expect(weatherService.getWeather).to.be.a('function');
		});

		it('check return value', function() {
			sinon.stub(weatherService, 'getWeather').returns({ hello: 'world' });
			
			var data = weatherService.getData();

			expect(weatherService.getData.called).to.equal(true);
			expect(data.hello).to.equal('world');
		});

	});
});