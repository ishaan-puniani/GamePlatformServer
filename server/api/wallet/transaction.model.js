'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TransactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  type: String
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);
