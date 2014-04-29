describe('WeatherController Tests', function() {

	var mockWeatherService;
	var weatherController;
	var req, res, next;

	beforeEach(function() {
		var MockJsonClientRepository = function() {};
		MockJsonClientRepository.prototype.get = sinon.stub();

		var MockWeatherService = function() {};
		MockWeatherService.prototype.getWeatherByZipCode = sinon.stub();

		var injector = new di.Injector([MockJsonClientRepository]);
		mockWeatherService = injector.get(MockWeatherService);

		var WeatherController = require('../../../lib/controllers/v1/weather/weathercontroller');
		weatherController = new WeatherController(mockWeatherService);	

		res = { send: function() {}, end: function() {} };
		sinon.stub(res, 'send');
		sinon.stub(res, 'end');
		next = sinon.stub();
	});

	describe('getWeatherZipCode()', function() {

		it('is a function', function() {
			expect(weatherController.getWeatherZipCode).to.be.a('function');
		});

		it('calls weatherService getWeatherByZipCode() with valid request', function() {
			req = { params: { zipcode: '85260' } };

			weatherController.getWeatherZipCode(req, res, next);

			expect(mockWeatherService.getWeatherByZipCode.callCount).to.equal(1);
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