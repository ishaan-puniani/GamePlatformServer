'use strict';

import constants from '../../constants';
// Development specific configuration
// ==================================
module.exports = {
  things: [{
    name: 'Development',
    info: 'Its is a development environment deployment'
  }],
  configurations: [
    {
      name: constants.configurationKeys.gameServerUrl,
      description: "Url of game execution server",
      value: "http://localhost:9001",
      active: true
    },
    {
      name: constants.configurationKeys.gameClientHost,
      description: "Game static content host server",
      value: "http://localhost:9080",
      active: true
    },
    {
      name: constants.configurationKeys.defaultCurrency,
      description: "Default currency of the this Casino",
      value: "EURO",
      active: true
    },
    {
      name: constants.configurationKeys.defaultBalanceForDemoPlay,
      description: "Default balance credited for demo play",
      value: 5000,
      active: true
    }

  ],
  games: [{
    name: "Slot",
    gameId: "Slot_Server",
    variant: "desktop",
    active: true
  }, {
    name: "JackOrBetter",
    gameId: "JackOrBetter_Server",
    variant: "desktop",
    active: true
  }],
  users: [{
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'admin',
    email: 'admin@admin.com',
    password: 'admin'
  }]
};
