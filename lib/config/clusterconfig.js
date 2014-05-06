'use strict';

module.exports = function(cluster) {
  return (function() {
  	
  	var cpuCount = require('os').cpus().length;

  	function handleConfigureCluster() {
  		for (var i = 0; i < cpuCount; i += 1) {
	      cluster.fork();
		  }

		  cluster.on('exit', function (worker) {
		    console.log('Worker ' + worker.id + ' died :(');
		    cluster.fork();
			});
  	}

  	return {
  		configureCluster: handleConfigureCluster
  	}

  })(cluster);
}