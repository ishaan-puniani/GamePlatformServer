'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
/**
 * @swagger
 * definition:
 *   Currencies:
 *     type: object
 *     required:
 *       - name
 *       - code
 *     properties:
 *       name:
 *         type: string
 *       code:
 *         type: string
 *       priority:
 *         type: integer
 *       active:
 *         type: boolean
 */
var GamesSchema = new mongoose.Schema({
  name: String,
  gameId: String,
  variant: String,
  active: Boolean
});

export default mongoose.model('Game', GamesSchema);
