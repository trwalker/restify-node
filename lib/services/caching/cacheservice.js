'use strict';

var CacheService = function() {

};

(function(CacheService) {

	var validateInput = function(namespace, key) {
		if(typeof namespace !== 'string') {
			throw 'CacheService: namespace must be a string';
		}

		if(typeof key !== 'string') {
			throw 'CacheService: key must be a string';
		}
	}

	var getNamespace = function(namespace) {
		var cacheNamespace = global;

		var parts = namespace.split('.');
		
		for(var i = 0; i < parts.length; i++) {
			var currentPart = parts[i];
			if(currentPart.length > 0) {
				cacheNamespace[currentPart] = cacheNamespace[currentPart] || {};
				cacheNamespace = cacheNamespace[currentPart];
			}
		}

		return cacheNamespace;
	};

	CacheService.prototype = {	

		get: function(namespace, key, defaultValue) {
			validateInput(namespace, key);

			var namespaceObject = getNamespace(namespace);
			var value = namespaceObject[key];
			
			if(!value) {
				value = defaultValue;
			}

			return value;
		},
		set: function(namespace, key, value) {
			validateInput(namespace, key);

			var namespaceObject = getNamespace(namespace);
			namespaceObject[key] = value;
		}
	};

})(CacheService);

module.exports = CacheService;