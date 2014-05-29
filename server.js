'use strict';

require('./lib/config/settingsconfig')(process);

if(settings.clusterEnabled === 1) {
	require('cluster-service').start({ workers: './lib/config/workerconfig.js',
																	 	accessKey: '123',
																	 	host: settings.hostName,
																	 	port: settings.masterPort });
}
else {
	require('./lib/config/workerconfig.js');
}
