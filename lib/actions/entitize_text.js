'use strict';

const entitize = require('../entitize');
const Joi = require('joi');
const create = require('../create_action');

module.exports = create({
	name: 'entitize.text',
	description: 'Entitize a text',
	access: 'read',

	dataSchema: Joi.object().keys({
		text: Joi.string().trim().min(2).required(),
		lang: Joi.string().trim().regex(/^[a-zA-Z]{2}$/).lowercase().required(),
		country: Joi.string().trim().regex(/^[a-zA-Z]{2}$/).lowercase()
	}).required(),

	dataParams: {
		text: {
			type: 'string',
			required: true
		},
		country: {
			type: 'string'
		},
		lang: {
			type: 'string'
		},
	},

	execute: (data, options) => {
		return entitize(data, options);
	}
});
