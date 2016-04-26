'use strict';

var express = require('express');
var gameController = require('./game.controller');

var router = express.Router();



import * as auth from '../../auth/auth.service';
import constants from '../../constants';




router.get('/', gameController.index);
router.get('/:id', gameController.show);
router.post('/play', function (req, res, next) {
    console.log("Pre");
    loadBalanceOnInit(req,res,next);
    // validate session
    addGameRoundToSession(req,res,next);
    
    next();
    
}, gameController.play, function (req, res, next) {
    console.log("Post");
    
    
    req.session.gameRes.balance = (1*req.session.gameReq.balance) - (1*req.session.gameReq.bet) + (1*req.session.gameRes.win);
    
    res.status(200).json(req.session.gameRes);
    debugger;
});
router.post('/', gameController.fetch);
router.put('/:id', gameController.update);
router.patch('/:id', gameController.update);
router.delete('/:id', gameController.destroy);

module.exports = router;


function addGameRoundToSession(req,res,next){
console.log("validateSession");
    //req.sessionID
    console.log(req.body.bet); 
    
    req.session.gameReq.roundOver = false;
    req.session.gameReq.bet=req.body.bet
 
    
}



function loadBalanceOnInit(req,res,next){
    // check if init request
    console.log("loadBalanceOnInit");
    if(!req.session.gameReq){
        req.session.gameReq={};
        req.session.gameReq.balance = GLOBAL.config[constants.configurationKeys.defaultBalanceForDemoPlay];
        req.session.gameReq.currency = GLOBAL.config[constants.configurationKeys.defaultCurrency];
    }
    if(req.session.gameRes){
       req.session.gameReq.balance = req.session.gameRes.balance;
       req.session.gameRes={};
    }
   
}