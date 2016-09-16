/**
 * Wallet manager
 */

'use strict';

import * as walletController from '../../api/wallet/wallet.controller' ;
import constants from '../../constants';
import * as logger from '../logger';

export function managePreGameRequest(req, res, next) {
  logger.log(0, "Wallet", "managePreGameRequest");

  // if game request is triggered first time then load initial balance and currency
  if (req.Game.action === "init") {
    walletController.createIfNotExists({
      userId: req.Game.userId,
      balance: parseInt(GLOBAL.config[constants.configurationKeys.defaultBalanceForDemoPlay]),
      currency: GLOBAL.config[constants.configurationKeys.defaultCurrency]
    }, function (err, walletResponse) {
      if (err) {

      } else {
        if (!req.Game.wallet) {
          req.Game.wallet = {};
          req.Game.wallet.balance = walletResponse.balance;
          req.Game.wallet.currency = walletResponse.currency;
        }
        next();
      }

    });
  }
  if (req.Game.action === "spin" || req.Game.action === "deal") {
    walletController.placeBet({
      userId: req.Game.userId,
      bet: req.Game.bet
    }, function (err, walletResponse) {
      if (err) {

      } else {
        if (!req.Game.wallet) {
          req.Game.wallet = {};
          req.Game.wallet.balance = walletResponse.balance;
          req.Game.wallet.currency = walletResponse.currency;
        }
        next();
      }
    })
  }
  if (req.Game.action === "draw") {
    walletController.getWalletOfUser(req.Game.userId, function (err, walletResponse) {
      if (err) {

      } else {
        if (!req.Game.wallet) {
          req.Game.wallet = {};
          req.Game.wallet.balance = walletResponse.balance;
          req.Game.wallet.currency = walletResponse.currency;
        }
        next();
      }
    })
  }
}
export function managePostGameRequest(req, res, next) {
  logger.log(0, "Wallet", "managePostGameRequest");
  walletController.addWin({
    userId: req.Game.userId,
    win: req.Game.win
  }, function (err, walletResponse) {
    if (err) {

    } else {
      if (!req.Game.wallet) {
        req.Game.wallet = {};
        req.Game.wallet.balance = walletResponse.balance;
        req.Game.wallet.currency = walletResponse.currency;
      }
      next();
    }
  })


  // next();
}
