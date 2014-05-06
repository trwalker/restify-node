'use strict';

var restify = require('restify');

var JsonClientRepository = function() {
};

JsonClientRepository.prototype = {
	get: function(url, path, headers, success, error) {
	  var client = restify.createJsonClient({
	    url: url,
	    headers: headers
	  });
	  
	  client.get(path, function(err, req, res, obj) {
	    if(err) {
	      error(res, err);
	    }
	    else {
	      success(res, obj);
	    }
	  });
	},
	head: function() {

	},
	post: function() {

	},
	put: function() {

	},
	del: function() {

	}
};

module.exports = JsonClientRepository;