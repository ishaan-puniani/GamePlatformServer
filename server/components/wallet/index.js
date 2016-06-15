/**
 * Wallet manager
 */

'use strict';

import * as walletController from '../../api/wallet/wallet.controller' ;
import constants from '../../constants';

export function managePreGameRequest(req, res,next){
    console.log("Wallet:managePreGameRequest");
    
    // if game request is triggered first time then load initial balance and currency
    if(req.Game.action==="init"){
        walletController.createIfNotExists({
            userId:req.Game.userId,
            balance:parseInt(GLOBAL.config[constants.configurationKeys.defaultBalanceForDemoPlay]),
            currency : GLOBAL.config[constants.configurationKeys.defaultCurrency]
        },function(err,walletResponse){
            if(err){
                
            }else{
                if(!req.Game.wallet){
                    req.Game.wallet={};
                    req.Game.wallet.balance = walletResponse.balance;
                    req.Game.wallet.currency = walletResponse.currency;
                }
                next();
            }
            
        });
    }
    if(req.Game.action==="spin"){
        walletController.placeBet({
            userId:req.Game.userId,
            bet:req.Game.bet
        },function(err,walletResponse){
            if(err){
                
            }else{
                if(!req.Game.wallet){
                    req.Game.wallet={};
                    req.Game.wallet.balance = walletResponse.balance;
                    req.Game.wallet.currency = walletResponse.currency;
                }
                next();
            }
        })
    }
}
export function managePostGameRequest(req, res,next){
    console.log("Wallet:managePostGameRequest");
    
     
    
    next();
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