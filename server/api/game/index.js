'use strict';

var express = require('express');
var gameController = require('./game.controller');

var gameRoundManager = require('./components/gameRoundManager');
var parser = require('./components/parser');
var tokenManager = require('./components/tokenManager');
var accountManager = require('./components/accountManager');
var gamePlayManager = require('./components/gamePlayManager');

var router = express.Router();


import * as auth from '../../auth/auth.service';
import constants from '../../constants';

router.get('/', gameController.index);

router.post('/play',
  parser.parseRequest,
  tokenManager.getUserByToken,
  gameRoundManager.getLastInCompleteRound,
  accountManager.placeBet,
  gameController.play,
  gamePlayManager.parseGameServerOutcome,
  gameRoundManager.saveRound,
  accountManager.addWin,
  tokenManager.generateToken,
  parser.postGameRequest,
  respond
);


module.exports = router;

function respond(req, res, next) {
  res.status(200).json(req.GameOutcome);
}
