'use strict';

var parser = require('concepts-parser');
var Promise = require('bluebird');

module.exports = function(context, options) {
	var concepts;
	try {
		concepts = parser.parse(context, options);
	} catch (e) {
		return Promise.reject(e);
	}
	return Promise.resolve(concepts);
};
