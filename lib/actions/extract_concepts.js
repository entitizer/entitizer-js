'use strict';

const Promise = require('bluebird');
const parser = require('concepts-parser');
const Joi = require('joi');
const create = require('../create_action');

module.exports = create({
	name: 'extract.concepts',
	description: 'Extracts concepts from a text.',
	access: 'read',

	dataSchema: Joi.object().keys({
		text: Joi.string().trim().min(2).max(5000).required(),
		lang: Joi.string().trim().length(2).required(),
		country: Joi.string().trim().length(2)
	}).required(),

	execute: (data, options) => {
		try {
			return Promise.resolve(parser.parse(data, options));
		} catch (e) {
			return Promise.reject(e);
		}
	}
});
