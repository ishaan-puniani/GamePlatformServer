/**
 * Session manager
 */

'use strict';

import * as gameRoundController from '../../api/gameRound/gameRound.controller' ;

export function managePreGameRequest(req, res,next){
    console.log("GameRound:managePreGameRequest");
    
    next();
    
}
export function managePostGameRequest(req, res,next){
    console.log("GameRound:managePostGameRequest");
    gameRoundController.insert({userId:req.Game.userId,
            bet:req.Game.bet,
            balance:req.Game.wallet.balance,
            currency:req.Game.wallet.currency,
            win:req.Game.win,
            game:req.Game.game,
            action:req.Game.action,
            outcome:req.Game.gameResponse,
            isOver:req.Game.roundOver
        },function(err,gameRound){
                if(err){

                }else{
                    next();
                }
        });
}

export function update(req, res,next){
    console.log("Wallet:update");
    
    if(!req.session.user){
        req.session.user = "DEMO-"+ uuid.v1()
    }
    console.log(req.session.user);
    next();
}
export function getInitBalance(req, res,next){
    console.log("Wallet:getInitBalance");
    
    if(!req.session.user){
        req.session.user = "DEMO-"+ uuid.v1()
    }
    console.log(req.session.user);
    next();
    
    
}