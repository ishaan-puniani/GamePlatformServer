/**
 * Session manager
 */

'use strict';

import * as logger from '../../../../components/logger';
import uuid from 'uuid';

/* Get user by token */
export function getUserByToken(req, res, next) {
  logger.log(0, "TokenManager", "getUserByToken", req.Game.userToken);

  req.Game.userId = "DEMO_Ishaan_123_EUR";

  if (req.Game.action === "spin") {
    req.Game.roundId = uuid.v4();
    console.log(req.Game.roundId);
  }

  next();
}

export function generateToken(req, res, next) {
  logger.log(0, "TokenManager", "getUserByToken", req.Game.userToken);

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
