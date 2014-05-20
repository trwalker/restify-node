'use strict';

require('./lib/config/settingsconfig')(process);

if(configSettings.clusterEnabled === 1) {
	require('cluster-service').start({ workers: './lib/config/workerconfig.js',
																	 	 accessKey: '123',
																	 	 host: configSettings.hostName,
																	 	 port: configSettings.masterPort });
}
else {
	require('./lib/config/workerconfig.js');
}