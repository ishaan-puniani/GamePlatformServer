/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/accounts              ->  index
 * POST    /api/accounts              ->  create
 * GET     /api/accounts/:id          ->  show
 * PUT     /api/accounts/:id          ->  update
 * DELETE  /api/accounts/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
//import Accounts from './accounts.model';
import Transaction from './transaction.model'
import {respondWithResult, handleEntityNotFound, handleError} from '../../helper/utils'
var Promise = require("bluebird");


// Gets a single Accounts from the DB
export function getBalanceDetails(req, res) {
  Transaction.findAsync({userId: req.params.userId})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function getBalance(req, res) {
  getUserBalance(req.params.userId)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function credit(req, res) {
  console.log("Account controller ", req.body.userId, " *****CREDIT***** ", req.body.coins)
  if (req.body.userId && req.body.coins >= 0) {
    var transaction = {
      userId: req.body.userId,
      type: "CR",
      coins: req.body.coins,
    };
    createTransaction(transaction)
      .then(respondWithResult(res))
      .catch(handleError(res));
  } else {
    handleError(res, 201)("Invalid Inputs");
  }
}

export function debit(req, res) {
  console.log("Account controller ", req.body.userId, " ********** ", req.body.coins)
  if (req.body.userId && req.body.coins >= 0) {
    var transaction = {
      userId: req.body.userId,
      type: "DR",
      coins: -1 * req.body.coins,
    };
    createTransaction(transaction)
      .then(respondWithResult(res))
      .catch(handleError(res));
  } else {
    handleError(res, 201)("Invalid Inputs");
  }
}


/*******************************************************************************/
/*                  PRIVATE METHODS                                            */
/******************************************************************************/
function createTransaction(obj) {
  return new Promise(function (resolve, reject) {
    Transaction.createAsync(obj).then(function (addedTransaction) {
      var responseEntity = {};
      if (addedTransaction._id) {
        responseEntity.success = true;
      } else {
        console.error("Issue occured during transaction");
        reject(new Error("Issue occured during transaction"));
      }
      getUserBalance(addedTransaction.userId).then(function (balance) {
        responseEntity.balance = balance;
        return responseEntity;
      }).then(resolve)
        .catch(reject);
    }).catch(reject);
  });
}
function getUserBalance(userId) {
  return Transaction.aggregateAsync({
      $match: {
        userId: userId
      }
    }, {
      $group: {
        _id: null,
        balance: {$sum: "$coins"}
      }
    }, {
      $project: {
        _id: 0,
        balance: 1
      }
    }
  ).then(function (aggregatedBalance) {
    return aggregatedBalance[0].balance;
  });
}
