/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import config from './environment';

var defaultConfig = require('./defaultConfig/' + process.env.NODE_ENV + '.js') || {}

import Thing from '../api/thing/thing.model';
import Configurations from '../api/configurations/configuration.model';
import Game from '../api/game/game.model';


import User from '../api/user/user.model';

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create(defaultConfig.things);
  });

Game.find({}).removeAsync()
  .then(() => {
    Game.create(defaultConfig.games);
  });


Configurations.find({}).removeAsync()
  .then(() => {
    Configurations.create(defaultConfig.configurations);
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync(defaultConfig.users)
    .then(() => {
      console.log('finished populating users');
    });
  });
