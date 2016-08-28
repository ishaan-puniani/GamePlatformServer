/**
 * Session manager
 */

'use strict';

import * as logger from '../../../../components/logger';

export function getLastInCompleteRound(req, res,next){
    logger.log(0,"GameRoundManager","getLastInCompleteRound",JSON.stringify(req.body));
// get last incomplete round on action=init request


    next();
}


export function saveRound(req, res,next){
  logger.log(0,"GameRoundManager","saveRound",JSON.stringify(req.body));
// get last incomplete round on action=init request


  next();
}









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
