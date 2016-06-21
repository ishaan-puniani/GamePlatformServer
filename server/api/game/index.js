'use strict';

var express = require('express');
var gameController = require('./game.controller');
var sessionManager = require('../../components/session');
var walletManager = require('../../components/wallet');
var gameRoundManager = require('../../components/gameRound');
var interceptor =  require('../../components/interceptor');
        
var router = express.Router();


import * as auth from '../../auth/auth.service';
import constants from '../../constants';




router.get('/', gameController.index);
router.get('/:id', gameController.show);

router.post('/play',interceptor.preGameRequest,
                    auth.getUserIdentity(),
                    sessionManager.getSession,
                    sessionManager.managePreGameRequest,
                    walletManager.managePreGameRequest,
                    gameRoundManager.managePreGameRequest,                
                    interceptor.preGameResponse,
                    gameController.play,
                    interceptor.postGameResponse,
                    gameRoundManager.managePostGameRequest,
                    walletManager.managePostGameRequest,
                    sessionManager.managePostGameRequest,
                    interceptor.postGameRequest,
                    respond
        );

router.post('/', gameController.fetch);
router.put('/:id', gameController.update);
router.patch('/:id', gameController.update);
router.delete('/:id', gameController.destroy);

module.exports = router;

function respond(req, res, next) {
    res.status(200).json(req.GameOutcome);
}