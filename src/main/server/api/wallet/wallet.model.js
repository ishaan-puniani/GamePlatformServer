'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var WalletSchema = new mongoose.Schema({
  userId: {type: String, index: {unique: true}},
  balance: Number,
  locked: Boolean,
  currency: String
}, {timestamps: true});

export default mongoose.model('Wallet', WalletSchema);
