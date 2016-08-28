/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wallets              ->  index
 * POST    /api/wallets              ->  create
 * GET     /api/wallets/:id          ->  show
 * PUT     /api/wallets/:id          ->  update
 * DELETE  /api/wallets/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Wallet from './wallet.model';
import Transaction from './transaction.model'

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}
function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Wallet
export function index(req, res) {
  Transaction.aggregateAsync([{
    $group: {
            _id: "$type",
            total: { $sum: "$amount" }
        }
    }])
    .then(respondWithResult(res))
    .catch(handleError(res));
}
/*
function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}



// Gets a single Wallet from the DB
export function show(req, res) {
  Wallet.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Wallet in the DB
export function create(req, res) {
  Wallet.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Wallet in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Wallet.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Wallet from the DB
export function destroy(req, res) {
  Wallet.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/


export function initUserWallet(req, res) {

}

export function getUserWallet(req, res) {

}

export function credit(req, res) {

}

export function debit(req, res) {

}







export function getWalletOfUser(userId,callback) {
    Wallet.findOne({userId:userId},callback);
}

export function placeBet(obj,callback) {
    Transaction.create({userId: obj.userId,amount: (-1*obj.bet), type:"BET"},function(err,transactionLooged){
        update(obj.userId,(-1*obj.bet),callback);
    });

}
export function addWin(obj,callback) {
    Transaction.create({userId: obj.userId,amount: obj.win, type:"WIN"},function(err,transactionLooged){
        update(obj.userId,obj.win,callback);
    });

}

export function createIfNotExists(obj,callback) {
    var initObj = {
        userId:obj.userId,
        balance:obj.balance,
        locked:false,
        currency:obj.currency
    }
    Wallet.findOneAndUpdate(
        {userId:obj.userId},
        {$setOnInsert: initObj},
        {upsert: true,new:true},
        callback
    );
}



function update(userId,amtToInc,callback) {
   Wallet.findOneAndUpdate({userId:userId},
                            {$inc:{balance:amtToInc}},
                            {upsert: false,new:true},
                            callback);
}
