'use strict';

var _ = require('lodash');

var CULTURES = {
	ro: ['ro', 'md'],
	ru: ['ru', 'md'],
	bg: ['bg'],
	hu: ['hu'],
	cs: ['cz'],
	pl: ['pl'],
	it: ['it']
};

module.exports = function() {
	return _.defaults(CULTURES);
};
