'use strict';

var getConcepts = require('./concepts');
var getQuotes = require('./quotes');
var extractEntities = require('./entities_extractor').fromConcepts;
var Promise = require('bluebird');

function formatResult(concepts, entities, quotes) {
	var result = {
		entities: entities || [],
		concepts: []
	};

	if (quotes) {
		result.quotes = quotes;
	}

	if (result.entities.length > 0) {
		var keys = [];
		result.entities.forEach(function(entity) {
			keys = keys.concat(entity.keys);
		});

		result.concepts = concepts.filter(function(concept) {
			return keys.indexOf(concept.key) === -1;
		});
	}

	return result;
}

function tryGetQuotes(context, entities, options) {
	if (options.quotes) {
		options = {
			persons: []
		};
		entities.forEach(function(entity) {
			if (entity.type === 'person') {
				entity.concepts.forEach(function(concept) {
					options.persons.push({
						index: concept.index,
						id: entity.id,
						name: entity.name
					});
				});
			}
		});
		return getQuotes(context.text, context.lang, options);
	}

	return Promise.resolve();
}

module.exports = function(context, options) {
	options = options || {};
	return getConcepts(context, options.concepts)
		.then(function(concepts) {
			return extractEntities(context, concepts)
				.then(function(entities) {
					return tryGetQuotes(context, entities, options)
						.then(function(quotes) {
							return formatResult(concepts, entities, quotes);
						});
				});
		});
};
