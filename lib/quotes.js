'use strict';

var parser = require('quote-parser');
var Promise = require('bluebird');

module.exports = function(text, lang, options) {
	var quotes;
	try {
		quotes = parser.parse(text, lang, options);
	} catch (e) {
		return Promise.reject(e);
	}
	return Promise.resolve(quotes);
};
