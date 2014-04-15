describe('WeatherController Tests', function() {
	
	var weatherService;
	var weatherController;
	var req, res, next;

	beforeEach(function() {
		weatherService = require('../../src/services/weatherservice')();
		weatherController = require('../../src/controllers/weathercontroller')(weatherService);

		req = {};
		res = {}; 
		res.send = sinon.stub();
		next = sinon.stub();
	});

	describe('get()', function(){

		it('is a function', function() {
			expect(weatherController.get).to.be.a('function');
		});

		it('calls weatherService getWeather()', function() {
			sinon.stub(weatherService, 'getWeather').returns(Q.fcall(function () {
    		return { tempF: '100', tempC: '70', humidity: '10' };
			}));
			
			weatherController.get(req, res, next);

			expect(weatherService.getWeather.called).to.equal(true);
			expect(weatherService.getWeather.callCount).to.equal(1);
		});

		it('calls res send()', function() {
			sinon.stub(weatherService, 'getWeather').returns(Q.fcall(function () {
    		return { tempF: '100', tempC: '70', humidity: '10' };
			}));

			weatherController.get(req, res, next);

			setTimeout(function() {
				expect(res.send.called).to.equal(true);
				expect(res.send.callCount).to.equal(1);	
			}, 10)
			
		});

	});
});