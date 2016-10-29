'use strict';

const Joi = require('joi');
const explorer = require('html-explorer');
const create = require('../../create_action');

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
	name: 'extract.article',
	description: 'Extract article from a web page',
	access: 'read',

	dataSchema: Joi.object().keys({
		url: Joi.string().uri({ scheme: ['http', 'https'] }).required()
	}).required(),

	dataParams: {
		url: {
			type: 'string',
			required: true
		}
	},

	execute: (data, options) => {
		return explorer.explore(data.url, options)
			.then((article) => {
				return {
					url: article.href,
					canonical: article.canonical,
					title: clearText(article.title),
					description: clearText(article.description),
					content: clearText(article.content),
					encoding: article.encoding,
					feeds: article.feeds,
					images: article.images,
					videos: article.videos,
					author: article.author
				};
			});
	}
});
