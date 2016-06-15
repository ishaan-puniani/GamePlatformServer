/**
 * Session manager
 */

'use strict';

export function preGameRequest(req, res,next){
    console.log("Interceptor:managePreGameRequest");
    req.Game = {};
    req.Game.game  = req.body.game;
    req.Game.action  = req.body.action;
    req.Game.bet  = req.body.bet?parseInt(req.body.bet):0;
    next();
}export function postGameRequest(req, res,next){
    console.log("Interceptor:managePostGameRequest");
    req.GameOutcome = req.Game.gameResponse;
    delete req.Game;
    console.log("Interceptor:managePostGameRequest - cleanup");
    next();
}
export function preGameResponse(req, res,next){
    console.log("Interceptor:preGameResponse");
    next();
}
export function postGameResponse(req, res,next){
    console.log("Interceptor:postGameResponse");
    req.Game.win = req.Game.gameResponse.win?parseInt(req.Game.gameResponse.win):0;
    req.Game.roundOver = req.Game.gameResponse.roundOver;
    req.Game.symbols = req.Game.gameResponse.symbols;
    req.Game.betlines = req.Game.gameResponse.betlines;
    
    
   
    
    next();
}