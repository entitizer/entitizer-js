'use strict';

const Data = require('../../data');
const Promise = require('bluebird');
const Joi = require('joi');

module.exports = {
	name: 'entities.get.entity',
	description: 'Get an Entity from DB.',
	category: 'entities',
	access: 'read',

	schema: Joi.object().keys({
			id: Joi.number().integer().min(1),
			key: Joi.string().min(1).trim(),
			name: Joi.string().min(1).trim().lowercase(),
			lang: Joi.string().regex(/^[a-zA-Z]{2}$/).lowercase(),
			country: Joi.string().regex(/^[a-zA-Z]{2}$/).lowercase()
		})
		.xor('id', 'key', 'name')
		.and('name', 'lang', 'country')
		.required(),

	inputs: ['id', 'key', 'name', 'lang', 'country'],

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
	},

	outputExample: {
		slug: 'chile',
		englishWikiName: 'Chile',
		wikiId: 17701,
		lang: 'ro',
		wikiName: 'Chile',
		country: 'md',
		region: 'cl',
		description: `Chile, pronunțat este o republică situată în America de Sud (America Latină), având granițe comune cu Peru la nord, Bolivia la nord-est și cu Argentina la sud. Este cuprinsă între 17º29'57'S și 56º32'S latitudine sudică. Capitala statului se află la Santiago de Chile (colocvial numit „Santiago”), cel mai mare oraș. Santiago este situat în Valea Centrală a țării, iar din punct de vedere administ...`,
		id: 441,
		englishWikiId: 5489,
		name: 'Chile',
		type: 'place'
	}
};
