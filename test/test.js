'use strict';

require('dotenv').load();

var assert = require('assert');
var entitizer = require('../lib');

describe('entitizer', function() {

	describe('#concepts', function() {
		it('should work with empty text', function() {
			return entitizer.concepts({
					lang: 'ro',
					country: 'ro',
					text: ''
				})
				.then(function(concepts) {
					assert.equal(0, concepts.length);
				});
		});
		it('should work with normal text', function() {
			return entitizer.concepts({
					lang: 'ro',
					country: 'ro',
					text: 'Traian Basescu in vizorul DNA'
				})
				.then(function(concepts) {
					assert.equal(2, concepts.length);
				});
		});
	});

	describe('#entitiesFromContext', function() {

		it('should find entities', function() {
			return entitizer.entitiesFromContext({
					lang: 'ro',
					country: 'ro',
					text: 'Traian Basescu in vizorul DNA'
				})
				.then(function(entities) {
					assert.ok(entities);
					assert.equal(2, entities.length);
				});
		});
	});

	describe('#entitiesFromConcepts', function() {

		it('should find entities', function() {
			var context = {
				lang: 'ro',
				country: 'ro',
				text: 'Traian Basescu in vizorul DNA'
			};
			return entitizer.concepts(context).then(function(concepts) {
				return entitizer.entitiesFromConcepts(context, concepts)
					.then(function(entities) {
						assert.ok(entities);
						assert.equal(2, entities.length);
					});
			});
		});
	});

	describe('#entityById', function() {
		it('should find entity by id', function() {
			return entitizer.entityById(1)
				.then(function(entity) {
					assert.ok(entity);
					assert.equal(1, entity.id);
				});
		});
	});

	describe('#entityByName', function() {
		it('should find entity by name', function() {
			return entitizer.entityByName('SUA', {
					lang: 'ro',
					country: 'ro'
				})
				.then(function(entity) {
					assert.ok(entity);
					assert.equal('SUA', entity.abbr);
				});
		});
	});

	describe('#findEntity', function() {
		this.timeout(1000 * 20);
		it('should find entity on the Internet', function() {
			return entitizer.findEntity('Кишинэу', 'ru')
				.then(function(entities) {
					// console.log('entities', entities);
					assert.ok(entities);
					assert.equal(2, entities.length);
				});
		});
	});

	describe('#cultures', function() {
		it('should work', function(done) {
			var cultures = entitizer.cultures();
			assert.ok(cultures);
			done();
		});
	});

});
