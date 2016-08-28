'use strict';

var express = require('express');
var controller = require('./accounts.controller');

var router = express.Router();

/**
 * @swagger
 * /api/accounts/{userId}:
 *   get:
 *     description: Get all the transactions of the made by this user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success with array
 *         schema:
 *           type: number
 *           items:
 *             $ref: '#/definitions/Transaction'
 *         examples:
 *             html/text:
 *               -
 *                 245
 *               -
 *                 1000
 */
router.get('/:userId', controller.getBalance);

/**
 * @swagger
 * /api/accounts/details/{userId}:
 *   get:
 *     description: Get all the transactions of the made by this user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success with array
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Transaction'
 *         examples:
 *             application/json:
 *               -
 *                 userId: "123456789"
 *                 coins: "500000"
 *                 type: "CR"
 *                 createdAt: "2016-07-25T16:39:26.487Z"
 *                 updatedAt: "2016-07-26T08:08:32.105Z"
 *               -
 *                 userId: "123456789"
 *                 coins: "100"
 *                 type: "DR"
 *                 createdAt: "2016-07-25T16:39:26.487Z"
 *                 updatedAt: "2016-07-26T08:08:32.105Z"
 */
router.get('/details/:userId', controller.getBalanceDetails);

router.post('/credit', controller.credit);
router.post('/debit', controller.debit);

module.exports = router;
