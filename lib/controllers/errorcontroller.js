'use strict';

module.exports = function() {
	return (function() {

		function handlerError(req, res, route, err) {
			// TODO: Handle Error Logging
			res.send(500, { errorCode: -100, message: 'oh noes, the system is down'});
			console.log('ERROR: { route: "' + route + '" error: "' + err + '"');
		}

		return {
			error: handleError
		};

	})();
};