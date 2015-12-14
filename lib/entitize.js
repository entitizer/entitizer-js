'use strict';

var getConcepts = require('./concepts');
var extractEntities = require('./entities_extractor').fromConcepts;

function formatResult(concepts, entities) {
	var result = {
		entities: entities || [],
		concepts: []
	};

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

module.exports = function(context, options) {
	options = options || {};
	var result = {};
	return getConcepts(context, options.conceptsOptions)
		.then(function(concepts) {
			return extractEntities(context, concepts)
				.then(function(entities) {
					return formatResult(concepts, entities);
				});
		});
};
