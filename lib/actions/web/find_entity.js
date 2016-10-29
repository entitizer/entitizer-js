'use strict';

const finder = require('entity-finder');
const Joi = require('joi');
const create = require('../../create_action');

module.exports = create({
	name: 'find.entity',
	description: 'Find an Entity on the Internet',
	category: 'web',
	access: 'read',

	dataSchema: Joi.object().keys({
		name: Joi.string().trim().min(2).required(),
		lang: Joi.string().trim().regex(/^[a-zA-Z]{2}$/).lowercase().required()
	}).required(),

	dataParams: {
		name: {
			type: 'string',
			required: true
		},
		lang: {
			type: 'string',
			required: true
		}
	},

	execute: (data, options) => {
		return finder.find(data.name, data.lang, options);
	}
});
