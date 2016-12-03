'use strict';

const Data = require('../data');
const Promise = require('bluebird');
const Joi = require('joi');
const create = require('../create_action');

module.exports = create({
	name: 'entity.find',
	description: 'Get entities from DB.',
	category: 'entities',
	access: 'read',

	dataSchema: Joi.object().keys({
			ids: Joi.array().items(Joi.number().integer()).min(1).unique(),
			keys: Joi.array().items(Joi.string()).min(1).unique()
		})
		.xor('ids', 'keys')
		.required(),

	execute: (data, options) => {
		if (data.ids) {
			return Data.entities.access.entitiesByIds(data.ids, options);
		}
		if (data.keys) {
			return Data.entities.access.entitiesByKeys(data.keys, options);
		}

		return Promise.reject(new Error('Invalid input data'));
	}
});
