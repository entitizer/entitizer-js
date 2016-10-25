'use strict';

require('dotenv').load();

if (!process.env.AWS_REGION) {
	return;
}

const assert = require('assert');
const entitizer = require('../lib');

const actionName = 'entities.get.entity';

describe('action', () => {

	it('invalid action name', () => {
		return entitizer.execute('entitie2323', { id: 1010 })
			.then(assert.fail)
			.catch(assert.ok);
	});

	describe(actionName, () => {
		it('should get by id', () => {
			return entitizer.execute(actionName, { id: 1010 })
				.then(function(entity) {
					assert.ok(entity);
					assert.equal(1010, entity.id);
				});
		});
		it('should get by name', () => {
			return entitizer.execute(actionName, { name: 'Uzbekistan', lang: 'ro', country: 'md' })
				.then(function(entity) {
					assert.ok(entity);
					assert.equal(1010, entity.id);
					assert.equal('Uzbekistan', entity.name);
				});
		});

		it('should throw error on getting by empty data', () => {
			return entitizer.execute(actionName, {})
				.then(assert.fail)
				.catch(assert.ok);
		});

		it('should throw error on getting by no data', () => {
			return entitizer.execute(actionName)
				.then(assert.fail)
				.catch(assert.ok);
		});

		it('should throw error on getting by id & key', () => {
			return entitizer.execute(actionName, { id: 1010, key: 'x32rc23r' })
				.then(assert.fail)
				.catch(assert.ok);
		});

		it('should throw error on getting by id & name', () => {
			return entitizer.execute(actionName, { id: 1010, name: 'x32rc23r' })
				.then(assert.fail)
				.catch(assert.ok);
		});

		it('should throw error on getting by key & name', () => {
			return entitizer.execute(actionName, { name: '1010', key: 'x32rc23r' })
				.then(assert.fail)
				.catch(assert.ok);
		});

		it('should throw error on getting by name: no lang', () => {
			return entitizer.execute(actionName, { name: 'Uzbekistan', country: 'md' })
				.then(assert.fail)
				.catch(assert.ok);
		});
		it('should throw error on getting by name: no country', () => {
			return entitizer.execute(actionName, { name: 'Uzbekistan', lang: 'ro' })
				.then(assert.fail)
				.catch(assert.ok);
		});
		it('should throw error on getting by name: no country & lang', () => {
			return entitizer.execute(actionName, { name: 'Uzbekistan' })
				.then(assert.fail)
				.catch(assert.ok);
		});
	});

});
