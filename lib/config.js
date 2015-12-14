'use strict';

var storage = require('entitizer.entities-storage');
var accessService;

exports = module.exports = function(config) {
	config = config || {};
	if (config.accessService) {
		accessService = config.accessService;
	}
};

exports.getAccessService = function() {
	if (!accessService) {
		accessService = new storage.AccessService();
	}
	return accessService;
};
