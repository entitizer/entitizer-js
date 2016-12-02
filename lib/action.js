'use strict';

const Actions = require('./actions');
const Joi = require('joi');
const Promise = require('bluebird');
const _ = require('lodash');
const validatePromise = Promise.promisify(Joi.validate);

const Action = module.exports;

function validate(data, schema) {
	return validatePromise(data, schema, {
		abortEarly: true,
		convert: true,
		allowUnknown: false,
		presence: 'optional',
		noDefaults: false
	});
}

function normalizeParams(data, params, keys) {
	if (!data) {
		return data;
	}
	if (!keys) {
		return data;
		// return _.cloneDeep(data);
	}

	data = _.pick(data, keys);
	// for (let i = keys.length - 1; i >= 0; i--) {
	// 	const key = keys[i];
	// 	if (params[key].type === 'array' && typeof data[key] === 'string') {
	// 		data[key] = data[key].split(',');
	// 	}
	// }

	return data;
}

Action.get = Actions.get;

Action.validate = (action, data, options) => {
	if (typeof action === 'string') {
		action = Actions.get(action);
		if (!action) {
			return Promise.reject(new Error('Invalid action'));
		}
	}

	const valid = {};
	// console.log('data', data, action.dataKeys);
	data = normalizeParams(data, action.dataParams, action.dataKeys);
	options = normalizeParams(options, action.optionsParams, action.optionsKeys);

	if (!action.dataSchema) {
		valid.data = data;
	} else {
		valid.data = validate(data, action.dataSchema);
	}

	if (!action.optionsSchema) {
		valid.options = options;
	} else {
		valid.options = validate(options, action.optionsSchema);
	}

	return Promise.props(valid);
};

Action.execute = (name, data, options) => {
	const action = Actions.get(name);

	if (!action) {
		return Promise.reject(new Error('Invalid action:' + name));
	}

	// validate on executing... ./create_action.js
	return action.execute(data, options);
};
