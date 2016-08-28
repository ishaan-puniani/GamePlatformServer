'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GameRoundSchema = new mongoose.Schema({
  userId: {type:String,index:true},
  bet:{},
  gameId: {type:String,index:true},
  action:{type:String,index:true},
  outcome: {},
  win : {},
  isOver:Boolean

}, { timestamps: true });

GameRoundSchema.index({ updatedAt: -1 })
export default mongoose.model('GameRound', GameRoundSchema);
