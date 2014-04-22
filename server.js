'use strict';

global.restify = require('restify');
global.fs = require('fs');

global.server = restify.createServer();

require('./lib/config/config')(server);

require('./routes')(server);

server.listen(9000, '127.0.0.1', function() {
	console.log('%s listening at %s', server.name, server.url);
});