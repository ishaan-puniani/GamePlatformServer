/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/games              ->  index
 * POST    /api/games              ->  create
 * GET     /api/games/:id          ->  show
 * PUT     /api/games/:id          ->  update
 * DELETE  /api/games/:id          ->  destroy
 */

'use strict';
import request from 'request'
import _ from 'lodash';
import Game from './game.model';
import constants from '../../constants';
import config from '../../config/environment';

import * as logger from '../../components/logger';


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

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

// Gets a list of Games
export function index(req, res) {
  Game.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a filtered list of Games
export function fetch(req, res) {
  Game.findAsync(req.body.filter)
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a single Game from the DB
export function show(req, res) {
  Game.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Game in the DB
export function create(req, res) {
  Game.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Game in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Game.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Game from the DB
export function destroy(req, res) {
  Game.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function play(req, res,next){
    logger.log(0,"game.controller","play",req.Game);
    logger.log(0,"game.controller","config.ges.uri ",config.ges.uri );
    // todo : must have game and action in the req.Game.rawReq
    
    var options = {
                    url: config.ges.uri + "/api/execute",
                    method:"POST",
                    headers: {
                      "Content-type": "application/json"
                    },
                    body : JSON.stringify(req.Game.rawReq)
                };
        
    request(options, function(err,httpResponse,body){
        logger.log(0,"game.controller","play response",body);
        req.Game.gameResponse = JSON.parse(body);
        next();
    });
    
}