'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GamesSchema = new mongoose.Schema({
  name: String,
  gameId: String,
  variant: String,
  active: Boolean
});

export default mongoose.model('Game', GamesSchema);
