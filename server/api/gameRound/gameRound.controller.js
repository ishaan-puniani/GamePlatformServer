/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/gameRounds              ->  index
 * POST    /api/gameRounds              ->  create
 * GET     /api/gameRounds/:id          ->  show
 * PUT     /api/gameRounds/:id          ->  update
 * DELETE  /api/gameRounds/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import GameRound from './gameRound.model';
import {respondWithResult, handleEntityNotFound, handleError} from '../../helper/utils'


export function countRounds(req, res) {
  console.log("frrr");
  GameRound.aggregateAsync([{
    $group: {
      _id: "$action",
      count: {$sum: 1}
    }
  }]).then(respondWithResult(res))
    .catch(handleError(res));
}


export function getLastRound(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

// Creates a new GameRound in the DB
export function create(req, res) {
  GameRound.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}



// Gets a single GameRound from the DB
export function show(req, res) {
  GameRound.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Updates an existing GameRound in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  GameRound.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function insert(obj, callback) {
  var initObj = {
    userId: obj.userId,
    bet: obj.bet,
    balance: obj.balance,
    currency: obj.currency,
    win: obj.win,
    game: obj.game,
    action: obj.action,
    outcome: obj.outcome,
    isOver: obj.over
  }
  GameRound.create(initObj, callback);
}

export function getLastIncompleteRound(obj, callback) {
  GameRound.findOne({
    userId: obj.userId,
    game: obj.game
  }, null, {sort: {updatedAt: -1}}, function (err, round) {
    if (err) {
      callback(err, round)
    }
    else if (round && round.outcome && round.outcome.roundOver === false) {
      callback(err, round)
    } else {
      callback(undefined, undefined);
    }
  });
}
/*
 function update(userId,amtToInc,lock,callback) {
 GameRound.findOneAndUpdate({userId:userId},
 {$inc:{balance:amtToInc},$set:{locked:lock}},
 {upsert: false,new:true},
 callback);
 }
 */
