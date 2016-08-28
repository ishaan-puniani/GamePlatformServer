'use strict';

var express = require('express');
var controller = require('./gameRound.controller');

var router = express.Router();

//router.get('/', controller.index);
//router.get('/:id', controller.show);

router.post('/getlastround', controller.getLastRound);
router.post('/save', controller.create);

//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

router.get('/allGameRounds', controller.countRounds)

module.exports = router;
