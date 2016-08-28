/**
 * Session manager
 */

'use strict';

import * as logger from '../../../../components/logger';










export function preGameResponse(req, res,next){
    logger.log(0,"Interceptor","preGameResponse");
    // todo: need to see if it is required to tell execution server that it is restore mode
    /*
    if(req.Game.restore){
        req.Game.rawReq.restore = req.Game.restore;
        req.Game.rawReq.lastOutcome = req.Game.lastOutcome;
    }
    */
    next();
}
export function postGameResponse(req, res,next){
   /* logger.log(0,"Interceptor","postGameResponse");
    req.Game.win = req.Game.gameResponse.win ? parseFloat(req.Game.gameResponse.win) : 0;
    req.Game.roundOver = req.Game.gameResponse.roundOver;
    req.Game.symbols = req.Game.gameResponse.symbols;
    req.Game.betlines = req.Game.gameResponse.betlines;
    next();
    */
}
