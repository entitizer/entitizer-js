'use strict';

require('dotenv').load();

if (!process.env.AWS_REGION) {
	return;
}

const assert = require('assert');
const entitizer = require('../lib');

const actionName = 'entities.get.entities';

describe(actionName, () => {
	it('should get by ids', () => {
		return entitizer.execute(actionName, { ids: [1010, 1011] })
			.then(function(entities) {
				assert.ok(entities);
				assert.equal(2, entities.length);
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

	it('should throw error on getting by ids & keys', () => {
		return entitizer.execute(actionName, { ids: [1010], keys: ['x32rc23r'] })
			.then(assert.fail)
			.catch(assert.ok);
	});

	it('should throw error on getting by ids: empty array', () => {
		return entitizer.execute(actionName, { ids: [] })
			.then(assert.fail)
			.catch(assert.ok);
	});
	it('should throw error on getting by ids: no unique value', () => {
		return entitizer.execute(actionName, { ids: [1, 1] })
			.then(assert.fail)
			.catch(assert.ok);
	});
});
