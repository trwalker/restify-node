'use strict';

var processConfig = require('./lib/config/processconfig')(process);

if(processConfig.clusterEnabled === 1) {
	require('cluster-service').start({ workers: './lib/config/workerconfig.js',
																	 	 accessKey: '123',
																	 	 host: processConfig.hostName,
																	 	 port: processConfig.masterPort });
}
else {
	require('./lib/config/workerconfig.js');
}