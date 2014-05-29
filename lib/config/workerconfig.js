'use strict';

var restify = require('restify');
var server = restify.createServer();
var fs = require('fs');

function configureWorker() {
	configureBodyParser();
	configureResponseHeaders();
	configureDependencies();
	configureRoutes();

	startServer();
}

function configureBodyParser() {
	server.use(restify.bodyParser({ mapParams: false }));
}

function configureResponseHeaders() {
	server.use(function(req, res, next) {
		res.setHeader('content-type', 'application/json');
		res.charSet('utf-8');
		next();
	});
}

function configureDependencies() {
	var diConfig = require('./diconfig')();

	server.use(function(req, res, next) {
		diConfig.configureDependencies(req);
		next();
	});
}

function configureRoutes() {
	require('./routeconfig')(server, fs).configureRoutes();
}

function startServer() {
	server.listen(settings.workerPort, settings.hostName, function() {
		console.log('%s listening at %s', server.name, server.url);
	});
}

configureWorker();
