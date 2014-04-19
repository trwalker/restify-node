describe('JsonClientService Tests', function() {
	
	var jsonClientService;
	var client;

	beforeEach(function() {
		jsonClientService = require('../../lib/services/jsonclientservice')();
		client = client = restify.createJsonClient({
			url: 'http://www.helloworld.com'
		});
	});

	describe('get()', function(){

		it('is a function', function() {
			expect(jsonClientService.get).to.be.a('function');
		});

		it('calls restify.createJsonClient() and client.get()', function() {
			sinon.stub(client, 'get', function(path, callback) { });

			sinon.stub(restify, 'createJsonClient').returns(client);

			jsonClientService.get('http://www.helloworld.com', '/somepath', null, function(res, obj) {}, function(res, err) {})

			expect(restify.createJsonClient.callCount).to.equal(1);
			expect(client.get.callCount).to.equal(1);
		});

	});
});