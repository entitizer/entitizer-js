'use strict';

var parser = require('concepts-parser');

module.exports = function(context, options) {
  return parser.parse(context, options);
};
