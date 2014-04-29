describe('WeatherService Tests', function() {
	
	var mockJsonClientRepository;
	var weatherService;

	beforeEach(function() {
		var MockJsonClientRepository = function() {};
		MockJsonClientRepository.prototype.get = function() {};

		mockJsonClientRepository = new MockJsonClientRepository();

		var WeatherService = require('../../../lib/services/weather/weatherservice');		
		weatherService = new WeatherService(mockJsonClientRepository);
	});

	describe('getWeatherByZipCode()', function(){

		it('is a function', function() {
			expect(weatherService.getWeatherByZipCode).to.be.a('function');
		});

		it('calls jsonClientRepository.get()', function() {
			sinon.stub(mockJsonClientRepository, 'get');
			
			weatherService.getWeatherByZipCode('85260', function() {}, function() {});

			expect(mockJsonClientRepository.get.callCount).to.equal(1);
		});

		it('valid postal code', function(done) {
			var error = function(weatherData) {
				throw 'error callback should NOT be called';
			};

			var success = function(weatherData) {
				expect(weatherData).to.not.equal(null);
				expect(weatherData.tempF).to.equal('100');
				expect(weatherData.tempC).to.equal('70');
				expect(weatherData.humidity).to.equal('10');

				done();
			};

			sinon.stub(mockJsonClientRepository, 'get', function(url, path, headers, success, error) {
				success({ status: 200 }, { data: { current_condition: [{ temp_F: '100', temp_C: '70', humidity: '10' }] } });
			});
			
			weatherService.getWeatherByZipCode('85260', success, error);
		});

		it('undefined postal code', function(done) {
			var error = function(weatherData) {
				expect(weatherData).to.not.equal(null);
				expect(weatherData.tempF).to.equal('0');
				expect(weatherData.tempC).to.equal('0');
				expect(weatherData.humidity).to.equal('0');

				done();
			};

			var success = function(weatherData) {
				throw 'success callback should NOT be called';
			};
			
			weatherService.getWeatherByZipCode(undefined, success, error);
		});

		it('null postal code', function(done) {
			var error = function(weatherData) {
				expect(weatherData).to.not.equal(null);
				expect(weatherData.tempF).to.equal('0');
				expect(weatherData.tempC).to.equal('0');
				expect(weatherData.humidity).to.equal('0');

				done();
			};

			var success = function(weatherData) {
				throw 'success callback should NOT be called';
			};
			
			weatherService.getWeatherByZipCode(null, success, error);
		});

		it('undefined success callback', function() {			
			var error = function(weatherData) { };
			
			expect(function() { weatherService.getWeatherByZipCode('85260', undefined, error); }).to.throw('Argument exception, "success" callback is required'); 
		});

		it('undefined error callback', function() {			
			var success = function(weatherData) { };
			
			expect(function() { weatherService.getWeatherByZipCode('85260', success, undefined); }).to.throw('Argument exception, "error" callback is required'); 
		});
	});
});