'use strict';

var CacheService = function() {

};

(function(CacheService) {

	var getNamespace = function(namespace) {
		var cacheNamespace = global;

		var parts = namespace.split('.');
		
		for(var i = 0; i < parts.length; i++) {
			var currentPart = parts[i];
			global[currentPart] = global[currentPart] || {};

			cacheNamespace = global[currentPart];
		}

		return cacheNamespace;
	};

	CacheService.prototype = {	

		get: function(namespace, key, defaultValue) {
			var namespaceObject = getNamespace(namespace);
			var value = namespaceObject[key];
			
			if(!value) {
				value = defaultValue;
			}

			return value;
		},
		set: function(namespace, key, value) {
			var namespaceObject = getNamespace(namespace);
			namespaceObject[key] = value;
		}
	};

})(CacheService);

module.exports = CacheService;