describe('WeatherController Tests', function() {

	var mockWeatherService;
	var WeatherController;
	var weatherController;
	var req, res, next;

	beforeEach(function() {
		var mockCacheService = { get: function() {}, set: function() {} };
		var mockJsonClientRepository = { get: function() {} };

		var WeatherService = require('../../../../lib/services/weather/weatherservice');
		mockWeatherService = new WeatherService(mockCacheService, mockJsonClientRepository);
		mockWeatherService.getWeatherByZipCode = sinon.stub();

		WeatherController = require('../../../../lib/controllers/v1/weather/weathercontroller');
		weatherController = new WeatherController(mockWeatherService);

		res = { send: function() {}, end: function() {} };
		sinon.stub(res, 'send');
		sinon.stub(res, 'end');
		next = sinon.stub();
	});

	describe('registerRoutes()', function() {

		it('is a function', function() {
			expect(WeatherController.registerRoutes).to.be.a('function');
		});

		it('calls server get() with route', function() {
			var server = { get: function(route, callback) { } };
			sinon.stub(server, 'get');

			WeatherController.registerRoutes(server);

			expect(server.get.calledWith('v1/weather/:zipcode'));
		});

	});

	describe('getWeatherZipCode()', function() {

		it('is a function', function() {
			expect(weatherController.getWeatherZipCode).to.be.a('function');
		});

		it('calls weatherService getWeatherByZipCode() with valid request', function() {
			req = { params: { zipcode: '85260' } };

			weatherController.getWeatherZipCode(req, res, next);

			expect(mockWeatherService.getWeatherByZipCode.calledWith('85260'));
		});

		it('calls weatherService getWeatherByZipCode() empty request', function() {
			req = {};

			weatherController.getWeatherZipCode(req, res, next);

			expect(mockWeatherService.getWeatherByZipCode.called).to.equal(false);

		});

		it('calls weatherService getWeatherByZipCode() request missing postal code', function() {
			req = { params: {} };

			weatherController.getWeatherZipCode(req, res, next);

			expect(mockWeatherService.getWeatherByZipCode.called).to.equal(false);

		});

	});
});
