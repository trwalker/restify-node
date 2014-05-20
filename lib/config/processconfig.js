'use strict'

module.exports = function(process) {
	return (function(process) {
		
		var clusterEnabled = process.argv[2] ? parseInt(process.argv[2]) : 0;
		var hostName = process.argv[3] ? process.argv[3] : '127.0.0.1';
		var masterPort =  process.argv[4] ? parseInt(process.argv[4]) : 3000;
		var workerPort =  process.argv[5] ? parseInt(process.argv[5]) : 9000;

		return {
			clusterEnabled: clusterEnabled,
			hostName: hostName,
			masterPort: masterPort,
			workerPort: workerPort
		};

	})(process);
};