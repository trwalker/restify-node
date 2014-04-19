describe('WeatherController Tests', function() {
	
	var jsonClientService;
	var weatherService;
	var weatherController;
	var req, res, next;

	beforeEach(function() {
		jsonClientService = require('../../lib/services/jsonclientservice')();
		weatherService = require('../../lib/services/weatherservice')(jsonClientService);
		weatherController = require('../../lib/controllers/weathercontroller')(weatherService);

		res = { send: function() {}, end: function() {} };
		sinon.stub(res, 'send');
		sinon.stub(res, 'end');
		next = sinon.stub();
	});

	describe('get()', function() {

		it('is a function', function() {
			expect(weatherController.get).to.be.a('function');
		});

		it('calls weatherService getWeather() with valid request', function() {
			sinon.stub(weatherService, 'getWeather');

			req = { params: { postalcode: '85260' } };

			weatherController.get(req, res, next);

			expect(weatherService.getWeather.callCount).to.equal(1);
			expect(weatherService.getWeather.calledWith('85260'));
		});

		it('calls weatherService getWeather() empty request', function() {
			sinon.spy(weatherService, 'getWeather');

			req = {};

			weatherController.get(req, res, next);

			expect(weatherService.getWeather.called).to.equal(false);

		});

	});
});