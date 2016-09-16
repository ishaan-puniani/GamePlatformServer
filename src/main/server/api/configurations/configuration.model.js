'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ConfigurationsSchema = new mongoose.Schema({
  name: String,
  description: String,
  value: String,
  active: Boolean
});

export default mongoose.model('Configuration', ConfigurationsSchema);
