describe('WeatherController Tests', function() {
	
	var jsonClientRepository;
	var weatherService;
	var weatherController;
	var req, res, next;

	beforeEach(function() {
		jsonClientRepository = require('../../../lib/repositories/http/jsonclientrepository')();
		weatherService = require('../../../lib/services/weather/weatherservice')(jsonClientRepository);
		weatherController = require('../../../lib/controllers/v1/weather/weathercontroller')(weatherService);

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
			sinon.stub(weatherService, 'getWeatherByZipCode');

			req = { params: { zipcode: '85260' } };

			weatherController.getWeatherZipCode(req, res, next);

			expect(weatherService.getWeatherByZipCode.callCount).to.equal(1);
			expect(weatherService.getWeatherByZipCode.calledWith('85260'));
		});

		it('calls weatherService getWeatherByZipCode() empty request', function() {
			sinon.spy(weatherService, 'getWeatherByZipCode');

			req = {};

			weatherController.getWeatherZipCode(req, res, next);

			expect(weatherService.getWeatherByZipCode.called).to.equal(false);

		});

		it('calls weatherService getWeatherByZipCode() request missing postal code', function() {
			sinon.spy(weatherService, 'getWeatherByZipCode');

			req = { params: {} };

			weatherController.getWeatherZipCode(req, res, next);

			expect(weatherService.getWeatherByZipCode.called).to.equal(false);

		});

	});
});