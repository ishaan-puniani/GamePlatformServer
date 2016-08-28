/**
 * Session manager
 */

'use strict';

import * as logger from '../../../../components/logger';
import request from 'request';

export function placeBet(req, res, next) {
  logger.log(0, "AccountManager", "placeBet", JSON.stringify(req.body));
// get last incomplete round on action=init request

  var gameConfig = require('../../gameConfig/' + req.Game.game);

  if (gameConfig.syncBalanceOn.indexOf(req.Game.action) > -1) {
    var options = {
      url: "http://localhost:9000" + "/api/accounts/" + req.Game.userId,
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "text/json"
      }
    };

    request(options, function (err, httpResponse, body) {
      logger.log(0, "accountManager", "Get User Plabace ", body);
      try {
        var accountResponse = parseInt(body);
        req.Game.wallet = {balance: accountResponse};
        console.log("req.Game.wallet", req.Game.wallet)
        next();
      }
      catch (ex) {
        console.log(ex);
      }

    });
  }
  else if (gameConfig.placeBetOnActions.indexOf(req.Game.action) > -1) {
    var options = {
      url: "http://localhost:9000" + "/api/accounts/debit",
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "text/json"
      },
      body: JSON.stringify({userId: req.Game.userId, coins: req.Game.bet.coins})
    };

    request(options, function (err, httpResponse, body) {
      logger.log(0, "accountManager", "bet deducted", body);
      var accountResponse = JSON.parse(body);
      if (accountResponse.success) {
        req.Game.wallet = {balance: accountResponse.balance};
        next();
      }
    });
  } else {

    next();
  }
}

export function addWin(req, res, next) {
  logger.log(0, "AccountManager", "add win", JSON.stringify(req.body));
  var gameConfig = require('../../gameConfig/' + req.Game.game);

  if (gameConfig.addWinOnActions.indexOf(req.Game.action) > -1) {
    console.log("req.Game.win", req.Game.win);
    var options = {
      url: "http://localhost:9000" + "/api/accounts/credit",
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "text/json"
      },
      body: JSON.stringify({userId: req.Game.userId, coins: req.Game.win})
    };

    request(options, function (err, httpResponse, body) {
      logger.log(0, "accountManager", "win added", body);
      var accountResponse = JSON.parse(body);
      if (accountResponse.success) {
        req.Game.wallet = {balance: accountResponse.balance};
        next();
      }
    });
  }else{
    next();

  }


}


/*

 export function postGameRequest(req, res,next){
 logger.log(0,"Parser","postGameRequest",req.Game);

 req.GameOutcome = req.Game.gameResponse;
 req.GameOutcome.balance = req.Game.wallet.balance;
 req.GameOutcome.currency = req.Game.wallet.currency;

 if(req.Game.restore){
 req.GameOutcome.restore = req.Game.restore;
 req.GameOutcome.lastOutcome = req.Game.lastOutcome;
 }

 delete req.Game;
 logger.log(0,"Interceptor","managePostGameRequest","cleanup");
 next();
 }
 */
