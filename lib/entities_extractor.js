'use strict';

var extractor = require('entitizer.entities-extractor');
var config = require('./config');
var _ = require('lodash');

function getOptions(options) {
	return _.defaults(options || {}, {
		accessService: config.getAccessService()
	});
}

exports.fromContext = function(context, options) {
	options = getOptions(options);

	return extractor.fromContext(context, options);
};

exports.fromConcepts = function(context, concepts, options) {
	options = getOptions(options);

	return extractor.fromConcepts(context, concepts, options);
};
