'use strict';

const Action = require('./action');

module.exports = (action) => {
	const innerExecute = action.execute;

	action.dataKeys = Object.keys(action.dataParams || {});
	if (action.optionsParams) {
		action.optionsKeys = Object.keys(action.optionsParams);
	}

	action.execute = (data, options) => {
		return Action.validate(action, data, options)
			.then((valid) => {
				return innerExecute.call(action, valid.data, valid.options);
			});
	};

	return action;
};
