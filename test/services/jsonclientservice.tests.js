describe('JsonClientService Tests', function() {
	
	var jsonClientService;

	beforeEach(function() {
		jsonClientService = require('../../src/services/jsonclientservice')();
	});

	describe('get()', function(){

		it('is a function', function() {
			expect(jsonClientService.get).to.be.a('function');
		});

		it('calls Q defer()', function() {
			
		});

	});
});