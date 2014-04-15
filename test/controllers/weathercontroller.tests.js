describe('WeatherController Tests', function() {
	
	var jsonClientService;
	var weatherService;
	var weatherController;
	var req, res, next;

	beforeEach(function() {
		jsonClientService = require('../../src/services/jsonclientservice')();
		weatherService = require('../../src/services/weatherservice')(jsonClientService);
		weatherController = require('../../src/controllers/weathercontroller')(weatherService);

		res = { send: function() { } };
		sinon.stub(res, 'send');
		next = sinon.stub();
	});

	describe('get()', function() {

		it('is a function', function() {
			expect(weatherController.get).to.be.a('function');
		});

		it('calls weatherService getWeather() valid request', function(done) {
			sinon.stub(weatherService, 'getWeather').returns(Q.fcall(function () {
    		return { tempF: '100', tempC: '70', humidity: '10' };
    		done();
			}));

			req = { params: { postalcode: '85260' } };

			weatherController.get(req, res, next);
			
			expect(weatherService.getWeather.called).to.equal(true);
			expect(weatherService.getWeather.callCount).to.equal(1);
		});

		it('calls weatherService getWeather() empty request', function(done) {
			sinon.spy(weatherService, 'getWeather');

			req = {};

			weatherController.get(req, res, next);

			expect(weatherService.getWeather.called).to.equal(false);

			done();
		});

	});
});