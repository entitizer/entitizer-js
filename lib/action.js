'use strict';

const Actions = require('./actions');
const Joi = require('joi');
const Promise = require('bluebird');
const validatePromise = Promise.promisify(Joi.validate);

const Action = module.exports = {};

Action.get = Actions.get;

Action.validate = (action, data) => {
	if (typeof action === 'string') {
		action = Actions.get(action);
	}

	if (!action) {
		return Promise.reject(new Error('Invalid action'));
	}

	if (!action.schema) {
		return Promise.resolve(data);
	}

	return validatePromise(data, action.schema, {
		abortEarly: true,
		convert: true,
		allowUnknown: false,
		presence: 'optional',
		noDefaults: false
	});
};

Action.execute = (name, data, options) => {
	const action = Actions.get(name);

	if (!action) {
		return Promise.reject(new Error('Invalid action:' + name));
	}

	return Action.validate(action, data)
		.then((validData) => {
			return action.execute(validData, options);
		});
};
