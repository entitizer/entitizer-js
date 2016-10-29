'use strict';

const Data = require('../../data');
const Promise = require('bluebird');
const Joi = require('joi');

module.exports = {
	name: 'entities.get.entities',
	description: 'Get entities from DB.',
	category: 'entities',
	access: 'read',

	schema: Joi.object().keys({
			ids: Joi.array().items(Joi.number().integer()).min(1).unique(),
			keys: Joi.array().items(Joi.string()).min(1).unique()
		})
		.xor('ids', 'keys')
		.required(),

	inputs: {
		ids: 'array',
		keys: 'array'
	},

	execute: (data, options) => {
		if (data.ids) {
			return Data.entities.access.entitiesByIds(data.ids, options);
		}
		if (data.keys) {
			return Data.entities.access.entitiesByKeys(data.keys, options);
		}

		return Promise.reject(new Error('Invalid input data'));
	},

	outputExample: {
		'for `ids` input': [{
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
		}]
	}
};
