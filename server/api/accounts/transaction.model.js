'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

/**
 * @swagger
 * definition:
 *   Transaction:
 *     type: object
 *     required:
 *       - userId
 *       - coins
 *       - type
 *     properties:
 *       userId:
 *         type: string
 *       coins:
 *         type: Number
 *       type:
 *         type: string
 */
var TransactionSchema = new mongoose.Schema({
  userId: {type: String, index: true},
  coins: Number,
  type: String // "Cr" - means deposit, "Dr" - means withdraw
}, {timestamps: true});


export default mongoose.model('Transaction', TransactionSchema);
