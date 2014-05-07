describe('CacheService Tests', function() {
	
	var cacheService;

	beforeEach(function() {
		var CacheService = require('../../../lib/services/caching/cacheservice');
		cacheService = new CacheService();
	});

	afterEach(function() {
		// clear cache namespace
		global.test = undefined; 
	});

	describe('get()', function() {

		it('creates a valid namespace', function() {
			expect(global.test).to.equal(undefined);

			var value = cacheService.get('test.services.caching', 'key1', null);
			
			expect(global.test.services.caching).to.not.equal(undefined);
		});

		it('pass a null namespace', function() {
			var exception = null;

			try {
				var value = cacheService.get(null, 'key1', null);
			}
			catch(err) {
				exception = err;
			}
			
			expect(exception).to.equal('CacheService: namespace must be a string');
		});

		it('pass an integer namespace', function() {
			var exception = null;

			try {
				var value = cacheService.get(123, 'key1', null);
			}
			catch(err) {
				exception = err;
			}
			
			expect(exception).to.equal('CacheService: namespace must be a string');
		});

		it('pass an empty namespace', function() {
			var value = cacheService.get('', 'key1', 'default');
			
			expect(value).to.equal('default');
		});

		it('pass a valid key', function() {
			var value = cacheService.get('test.services.caching', 'key1', 'default');
			
			expect(value).to.equal('default');
		});

		it('pass a null key', function() {
			var exception = null;

			try {
				var value = cacheService.get('test.services.caching', null, null);
			}
			catch(err) {
				exception = err;
			}
			
			expect(exception).to.equal('CacheService: key must be a string');
		});

		it('pass an integer key', function() {
			var exception = null;

			try {
				var value = cacheService.get('test.services.caching', 1234, null);
			}
			catch(err) {
				exception = err;
			}
			
			expect(exception).to.equal('CacheService: key must be a string');
		});

		it('existing value', function() {
			global.test = {};
			global.test.services = {};
			global.test.services.caching = {};
			global.test.services.caching.key1 = 'hello world';

			var value = cacheService.get('test.services.caching', 'key1', null);
			
			expect(value).to.equal('hello world');
		});

		it('non-existing value', function() {
			var value = cacheService.get('test.services.caching', 'key1', 'default');
			
			expect(value).to.equal('default');
		});

	});

	describe('set()', function() {

		it('creates a valid namespace', function() {
			expect(global.test).to.equal(undefined);

			cacheService.set('test.services.caching', 'key1', 'hello world');
			
			expect(global.test.services.caching).to.not.equal(undefined);
		});

		it('pass a null namespace', function() {
			var exception = null;

			try {
				cacheService.set(null, 'key1', 'hello world');
			}
			catch(err) {
				exception = err;
			}
			
			expect(exception).to.equal('CacheService: namespace must be a string');
		});

		it('pass an integer namespace', function() {
			var exception = null;

			try {
				cacheService.set(1234, 'key1', 'hello world');
			}
			catch(err) {
				exception = err;
			}
			
			expect(exception).to.equal('CacheService: namespace must be a string');
		});

		it('pass an empty namespace', function() {
			cacheService.set('', 'key1', 'hello world');
			
			expect(global.key1).to.equal('hello world');
		});

		it('pass a valid key', function() {
			cacheService.set('test.services.caching', 'key1', 'hello world');
			
			expect(global.test.services.caching.key1).to.equal('hello world');
		});

		it('pass a null key', function() {
			var exception = null;

			try {
				cacheService.set('test.services.caching', null, 'hello world');
			}
			catch(err) {
				exception = err;
			}
			
			expect(exception).to.equal('CacheService: key must be a string');
		});

		it('pass an integer key', function() {
			var exception = null;

			try {
				cacheService.set('test.services.caching', 1234, 'hello world');
			}
			catch(err) {
				exception = err;
			}
			
			expect(exception).to.equal('CacheService: key must be a string');
		});

		it('existing value', function() {
			global.test = {};
			global.test.services = {};
			global.test.services.caching = {};
			global.test.services.caching.key1 = 'hello world';

			cacheService.set('test.services.caching', 'key1', 'new value');
			
			expect(global.test.services.caching.key1).to.equal('new value');
		});

	});

});