'use strict';

var ipAddress = process.argv[2] ? process.argv[2] : '127.0.0.1';
var port =  process.argv[3] ? parseInt(process.argv[3]) : 9000;
var clusterEnabled = process.argv[4] ? parseInt(process.argv[4]) : 0;

if(clusterEnabled === 1) {
	var cluster = require('cluster');
	
	if(cluster.isMaster) {
		require('./lib/config/clusterconfig')(cluster).configureCluster();
	}
	else {
		require('./lib/config/serverconfig')().configureServer(ipAddress, port);
	}
}
else {
	require('./lib/config/serverconfig')().configureServer(ipAddress, port);
}

