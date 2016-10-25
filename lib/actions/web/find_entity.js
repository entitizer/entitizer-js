'use strict';

const finder = require('entity-finder');
const Joi = require('joi');

module.exports = {
	name: 'web.find.entity',
	description: 'Find an Entity on the Internet',
	category: 'web',
	access: 'read',

	schema: Joi.object().keys({
		name: Joi.string().trim().min(2).required(),
		lang: Joi.string().trim().regex(/^[a-zA-Z]{2}$/).lowercase().required()
	}).required(),

	execute: (data, options) => {
		return finder.find(data.name, data.lang, options);
	}
};
