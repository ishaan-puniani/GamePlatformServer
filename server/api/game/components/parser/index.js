/**
 * Parser
 */

'use strict';

import * as logger from '../../../../components/logger';

/* decrypt and parse the game play request and add Game object to request */
export function parseRequest(req, res, next) {
  logger.log(0, "Parser", "preGameRequest", JSON.stringify(req.body));
  req.Game = {};
  req.Game.game = req.body.game;
  req.Game.action = req.body.action;

  if (req.body.bet) {
    req.Game.bet = {
      betLevel: req.body.bet.betLevel,
      denomination: req.body.bet.denomination,
      coins: req.body.bet.coins ? parseFloat(req.body.bet.coins) : 0
    }
  }


  req.Game.userToken = req.body.userToken;
  req.Game.rawReq = req.body;

  next();
}


export function postGameRequest(req, res, next) {
  logger.log(0, "Parser", "postGameRequest", req.Game);

  req.GameOutcome = req.Game.gameResponse;
  req.GameOutcome.balance = req.Game.wallet.balance;
  req.GameOutcome.currency = req.Game.wallet.currency;

  if (req.Game.restore) {
    req.GameOutcome.restore = req.Game.restore;
    req.GameOutcome.lastOutcome = req.Game.lastOutcome;
  }

  delete req.Game;
  logger.log(0, "Interceptor", "managePostGameRequest", "cleanup");
  next();
}
