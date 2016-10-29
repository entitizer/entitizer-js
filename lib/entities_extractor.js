'use strict';

const Data = require('./data');
const extractor = require('entitizer.entities-extractor');
const _ = require('lodash');

function getOptions(options) {
	return _.defaults(options || {}, {
		accessService: Data.entities.access
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
