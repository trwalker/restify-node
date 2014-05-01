'use strict';

module.exports = function(server, fs) {
  
	return (function(server, fs) {

		var controllerBaseDir = 'lib/controllers/';

		function handleConfigureRoutes() {
			var versionFolders = getVersionFolders();

			for(var i = 0; i < versionFolders.length; i++) {
				registerControllersInFolder(versionFolders[i]);	
			}
		}

		function getVersionFolders() {
			var items = fs.readdirSync(controllerBaseDir);
			var versionFolders = new Array();
			var versionFoldersCount = 0;

			for(var i = 0; i < items.length; i++) {
	  		var item = items[i];
		 		if(isFolder(item) && item.indexOf('v') === 0) {
		 			versionFolders[versionFoldersCount] = controllerBaseDir + item + '/';
		 			versionFoldersCount++;
		 		} 
			}

			return versionFolders;
		}

		function isFolder(item) {
			return item.indexOf('.') === -1;
		}

		function isController(item) {
			return item.indexOf('controller.js') !== -1;
		}

		function registerControllersInFolder(folderPath) {
			var items = fs.readdirSync(folderPath);

			for(var i = 0; i < items.length; i++) {
				var item = items[i];
				if(isFolder(item)) {
					registerControllersInFolder(folderPath + item + '/');
				}
				else if(isController(item)) {
					registerController(folderPath, item);
				}
			}
		}

		function registerController(folderPath, item) {
			var di = require('di');
			var injector = new di.Injector([]);

			var controllerRequirePath = folderPath.replace('lib', '..') + item.replace('.js', '');
			var Controller = require(controllerRequirePath);

			var controllerInstance = injector.get(Controller);
			
			if(typeof controllerInstance.registerRoutes === 'function') {
				controllerInstance.registerRoutes(server);					
			}
			else {				
				throw ('Controller needs to implement the "registerRoutes()" function: ' + controllerRequirePath);
			}
		}

		return {
			configureRoutes: handleConfigureRoutes
		};

	})(server, fs);
};