'use strict';

const _ = require('lodash');
const glob = require('glob');

// load all actions
const ACTIONS_LIST = glob.sync('./actions/**/*.js', { cwd: __dirname }).map((file) => require(file));

// map actions by name
const ACTIONS_MAP = ACTIONS_LIST.reduce((map, action) => {
	map[action.name] = action;
	return map;
}, {});

//
// ---- API ----
//
exports.get = (name) => {
	return ACTIONS_MAP[name];
};

exports.all = () => {
	return ACTIONS_LIST;
};

exports.filter = (filter) => {
	return _.filter(ACTIONS_LIST, filter || {});
};

exports.category = (category) => {
	return exports.filter({ category: category });
};

exports.access = (access) => {
	return exports.filter({ access: access });
};
