'use strict';

const debug = require('debug')('entitizer');
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

Action.validate = (action, data, options) => {
	if (typeof action === 'string') {
		action = Action.get(action);
		if (!action) {
			return Promise.reject(new Error('Invalid action'));
		}
	}

	debug('Validating action ' + action.name, data, options);

	const valid = {};
	// console.log('data', data, action.dataKeys);
	data = normalizeParams(data, action.dataParams, action.dataKeys);
	options = normalizeParams(options, action.optionsParams, action.optionsKeys);

	// debug('normalized inputs ', data, options);

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
	const action = Action.get(name);

	if (!action) {
		return Promise.reject(new Error('Invalid action: ' + name));
	}
	debug('Executing action ' + name, data, options);
	// validate on executing... ./create_action.js
	return action.execute(data, options);
};

const ACTIONS_MAP = {};

Action.get = function(name) {
	if (!ACTIONS_MAP[name]) {
		const fileName = name.replace(/\./g, '_');
		try {
			ACTIONS_MAP[name] = require('./actions/' + fileName);
		} catch (e) {
			return null;
			// throw new Error('Action ' + name + ' does not exists');
		}
	}

	return ACTIONS_MAP[name];
};
