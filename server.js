'use strict';

var server = require('restify').createServer();
var fs = require('fs');

require('./lib/config/config')(server);

require('./routes')(server, fs);

server.listen(9000, '127.0.0.1', function() {
	console.log('%s listening at %s', server.name, server.url);
});