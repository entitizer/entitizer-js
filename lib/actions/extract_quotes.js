'use strict';

const Promise = require('bluebird');
const parser = require('quote-parser');
const Joi = require('joi');
const create = require('../create_action');

module.exports = create({
	name: 'extract.quotes',
	description: 'Extracts quotes from a text.',
	access: 'read',

	dataSchema: Joi.object().keys({
		text: Joi.string().trim().min(2).max(5000).required(),
		lang: Joi.string().trim().length(2).required()
	}).required(),

	execute: (data, options) => {
		try {
			return Promise.resolve(parser.parse(data.text, data.lang, options));
		} catch (e) {
			return Promise.reject(e);
		}
	}
});
