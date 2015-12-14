'use strict';

var storage = require('entitizer.entities-storage');
var config = require('./config');

exports.byId = function(id, options) {
	var accessService = config.getAccessService();
	return accessService.entityById(id, options);
};

exports.byKey = function(key, options) {
	var accessService = config.getAccessService();
	return accessService.entityByKey(key, options);
};

exports.byName = function(name, context, options) {
	var key = storage.EntityName.createKey(name, context.lang, context.country);
	return exports.byKey(key, options);
};
