'use strict';

module.exports = function() { 
  return (function() {
  	var restify = require('restify');
    
  	function getRequest(url, path, headers, success, error) {

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