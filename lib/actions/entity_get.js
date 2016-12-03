'use strict';

const Data = require('../data');
const Promise = require('bluebird');
const Joi = require('joi');
const create = require('../create_action');

module.exports = create({
	name: 'entity.get',
	description: 'Get an Entity from DB.',
	category: 'entities',
	access: 'read',

	dataSchema: Joi.object().keys({
			id: Joi.number().integer().min(1),
			key: Joi.string().min(1).trim(),
			name: Joi.string().min(1).trim().lowercase(),
			lang: Joi.string().regex(/^[a-zA-Z]{2}$/).lowercase(),
			country: Joi.string().regex(/^[a-zA-Z]{2}$/).lowercase()
		})
		.xor('id', 'key', 'name')
		.and('name', 'lang', 'country')
		.required(),

	execute: (data, options) => {
		if (data.id) {
			return Data.entities.access.entityById(data.id, options);
		}
		if (data.key) {
			return Data.entities.access.entityByKey(data.key, options);
		}
		if (data.name) {
			return Data.entities.access.entityByName(data, options);
		}

		return Promise.reject(new Error('Invalid input data'));
	}
});
