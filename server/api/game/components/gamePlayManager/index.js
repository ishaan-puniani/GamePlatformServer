/**
 * Session manager
 */

'use strict';

import * as logger from '../../../../components/logger';

export function parseGameServerOutcome(req, res, next) {
  logger.log(0, "GamePlayManager", "parseGameServerOutcome");
// get last incomplete round on action=init request
  req.Game.win = req.Game.gameResponse.win ? parseFloat(req.Game.gameResponse.win) : 0;
  req.Game.roundOver = req.Game.gameResponse.roundOver;
  req.Game.symbols = req.Game.gameResponse.symbols;
  req.Game.betlines = req.Game.gameResponse.betlines;
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
