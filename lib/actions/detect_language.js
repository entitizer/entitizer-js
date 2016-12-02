'use strict';

const Promise = require('bluebird');
const detect = Promise.promisify(require('cld').detect);
const Joi = require('joi');
const create = require('../create_action');

module.exports = create({
	name: 'detect.language',
	description: 'Detects the main language of a text.',
	access: 'read',

	dataSchema: Joi.object().keys({
		text: Joi.string().trim().min(2).required()
	}).required(),

	dataParams: {
		text: {
			type: 'string',
			required: true
		}
	},

	execute: (data, options) => {
		return detect(data.text, options || {})
			.then((result) => {
				if (result && result.languages) {
					result = result.languages;
				}
				return result;
			});
	}
});
