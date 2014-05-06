'use strict';

module.exports = function() {
	return (function() {
		
		function handleConfigureSettings() {
			global.configSettingOne = '1234';	
		}
		
		return {
			configureSettings: handleConfigureSettings
		};
		
	})();
};