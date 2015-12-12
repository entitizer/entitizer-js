'use strict';

var finder = require('entity-finder');

module.exports = function(name, lang, options) {
  return finder.find(name, lang, options);
};
