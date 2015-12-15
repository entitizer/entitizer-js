'use strict';

var getEntity = require('./get_entity');
var extractor = require('./entities_extractor');

exports.entityById = getEntity.byId;
exports.entityByKey = getEntity.byKey;
exports.entityByName = getEntity.byName;

exports.entitiesFromContext = extractor.fromContext;
exports.entitiesFromConcepts = extractor.fromConcepts;

exports.entitize = require('./entitize');
exports.concepts = require('./concepts');
exports.quotes = require('./quotes');
exports.findEntity = require('./find_entity');
exports.cultures = require('./cultures');
exports.config = require('./config');
