'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GameRoundSchema = new mongoose.Schema({
  userId: String,
  bet:Number,
  game: String,
  action:String,
  outcome: {},
  isOver:Boolean
  
}, { timestamps: true });

export default mongoose.model('GameRound', GameRoundSchema);
