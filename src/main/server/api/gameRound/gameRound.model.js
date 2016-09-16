'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GameRoundSchema = new mongoose.Schema({
  userId: {type: String, index: true},
  bet: Number,
  game: {type: String, index: true},
  action: {type: String, index: true},
  outcome: {},
  win: Number,
  isOver: Boolean

}, {timestamps: true});

GameRoundSchema.index({updatedAt: -1})
export default mongoose.model('GameRound', GameRoundSchema);
