'use strict';

global.Q = require('q');

global.restify = require('restify');

global.server = restify.createServer();

require('./src/config/config')(server);

require('./src/routes')(server);

server.listen(9000, '127.0.0.1', function() {
	console.log('%s listening at %s', server.name, server.url);
});