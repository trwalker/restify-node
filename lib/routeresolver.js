
module.exports = function(server) {
	return (function(server) {
		var controllerBaseDir = 'lib/controllers/';

		function handleRegisterRoutes() {
			var versionFolders = getVersionFolders();

			for(var i = 0; i < versionFolders.length; i++) {
				registerControllerRoutes(versionFolders[i]);	
			}
		}

		function isFolder(item) {
			return item.indexOf('.') === -1;
		}

		function isControllerResolver(item) {
			return item.indexOf('controllerresolver.js') !== -1;
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

		function registerControllerRoutes(folderPath) {
			items = fs.readdirSync(folderPath);

			for(var i = 0; i < items.length; i++) {
				var item = items[i];
				if(isFolder(item)) {
					registerControllerRoutes(folderPath + item + '/');
				}
				else if(isControllerResolver(item)) {
					registerRoute(folderPath + item);
				}
			}
		}

		function registerRoute(controllerResolverPath) {
			var controllerResolver = require(controllerResolverPath.replace('.js', ''))();

			var controller = controllerResolver.resolveController();

			if(controller.registerRoutes) {
				controller.registerRoutes(server);					
			}
		}

		return {
			registerRoutes: handleRegisterRoutes
		};

	})(server);
}