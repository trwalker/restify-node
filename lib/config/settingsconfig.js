'use strict';

module.exports = function(process) {
	(function(process) {

		function handleConfigureSettings(process) {
			global.settings = {};

			global.settings.clusterEnabled = process.argv[2] ? parseInt(process.argv[2]) : 0;
			global.settings.hostName = process.argv[3] ? process.argv[3] : '127.0.0.1';
			global.settings.masterPort =  process.argv[4] ? parseInt(process.argv[4]) : 3000;
			global.settings.workerPort =  process.argv[5] ? parseInt(process.argv[5]) : 9000;
		}

		debugger;
		handleConfigureSettings(process);

	})(process);
};
