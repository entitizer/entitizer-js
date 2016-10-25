'use strict';

var Entities = require('entitizer.entities-storage');

exports.entities = {
	access: new Entities.AccessService(),
	control: new Entities.ControlService()
};
