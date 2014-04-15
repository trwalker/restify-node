'use strict';

module.exports = function() { 
  return (function() {
  		var client = restify.createJsonClient({
  			url: 'http://api.worldweatheronline.com'
			});

  	function getRequest(url, path, headers) {
  		var deferred = Q.defer();

  		var client = restify.createJsonClient({
  			url: url,
  			headers: headers
			});
			
			client.get(path, function(err, req, res, obj) {
			  if(err) {
					deferred.reject(err);
			  }
			  else {
			  	deferred.resolve(obj);
			  }
			});
			
			return deferred.promise;
  	}

  	function headRequest() {

  	}

  	function postRequest() {

  	}

  	function putRequest() {

  	}

  	function deleteRequest() {

  	}

  	return {
  		get: getRequest,
  		head: headRequest,
  		post: postRequest,
  		put: putRequest,
  		del: deleteRequest
  	};
	})();
};