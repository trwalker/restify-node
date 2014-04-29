'use strict';

var RouteResolver = function(server, fs) {
	var controllerBaseDir = 'lib/controllers/';

	var isFolder = function(item) {
		return item.indexOf('.') === -1;
	};

	var isController = function(item) {
		return item.indexOf('controller.js') !== -1;
	};

	var getVersionFolders = function() {
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
	};

	var registerControllers = function(folderPath) {
		var items = fs.readdirSync(folderPath);

		for(var i = 0; i < items.length; i++) {
			var item = items[i];
			if(isFolder(item)) {
				registerControllers(folderPath + item + '/');
			}
			else if(isController(item)) {
				registerController(folderPath, item);
			}
		}
	};

	var registerController = function(folderPath, item) {
		var di = require('di');
		var injector = new di.Injector([]);

		var controllerRequirePath = folderPath.replace('lib', '.') + item.replace('.js', '');
		var Controller = require(controllerRequirePath);
		debugger;
		var controllerInstance = injector.get(Controller);
		
		if(typeof controllerInstance.registerRoutes === 'function') {
			controllerInstance.registerRoutes(server);					
		}
		else {				
			throw ('Controller needs to implement the "registerRoutes()" function: ' + controllerRequirePath);
		}
	};

	this.registerRoutes = function() {
		var versionFolders = getVersionFolders();

		for(var i = 0; i < versionFolders.length; i++) {
			registerControllers(versionFolders[i]);	
		}
	};
};

module.exports = RouteResolver;