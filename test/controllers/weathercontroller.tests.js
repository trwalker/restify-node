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
			sinon.stub(dataService, 'getWeather');
			
			weatherController.get(req, res, next);

			expect(dataService.getData.called).to.equal(true);
			expect(dataService.getData.callCount).to.equal(1);
		});

		it('calls res send()', function() {
			weatherController.get(req, res, next);

			expect(res.send.called).to.equal(true);
			expect(res.send.callCount).to.equal(1);
		});

	});
});