'use strict';

const entitize = require('../entitize');
const Joi = require('joi');
const Promise = require('bluebird');
const ascrape = Promise.promisify(require('ascrape'));
const create = require('../create_action');

function clearText(text) {
	return text
		.replace(/[\u00A0\f\r\t\v]/g, ' ')
		.replace(/ {2,}/g, ' ')
		.replace(/\s+\n/g, '\n')
		.replace(/\n\s+/g, '\n')
		.replace(/\n{2,}/g, '\n')
		.trim();
}

module.exports = create({
	name: 'entitize.url',
	description: 'Entitize text in a web page article',
	access: 'read',

	dataSchema: Joi.object().keys({
		url: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
		lang: Joi.string().trim().regex(/^[a-zA-Z]{2}$/).lowercase().required(),
		country: Joi.string().trim().regex(/^[a-zA-Z]{2}$/).lowercase()
	}).required(),

	dataParams: {
		url: {
			type: 'string',
			required: true
		},
		lang: {
			type: 'string'
		},
		country: {
			type: 'string'
		}
	},

	execute: (data, options) => {
		return ascrape(data.url)
			.then((article) => {
				const entitizeData = {
					lang: data.lang,
					country: data.country,
					text: []
				};
				if (article.title) {
					entitizeData.text.push(article.title);
				}
				if (article.excerpt) {
					entitizeData.text.push(article.excerpt);
				}
				entitizeData.text.push(article.content.text());

				entitizeData.text = entitizeData.text.join('\n');

				entitizeData.text = clearText(entitizeData.text);

				return entitize(entitizeData, options)
					.then((result) => {
						result.input = entitizeData;
						return result;
					});
			});
	}
});
