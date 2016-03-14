'use strict';

import constants from '../../constants';
// Development specific configuration
// ==================================
        module.exports = {
            things: [{
                    name: 'Staging',
                    info: 'Its is a Staging environment testing and deployment'
                }],
            configurations: [
                {
                    name: constants.configurationKeys.gameServerUrl,
                    description: "Url of game execution server",
                    value: "http://gameserver-gameolive.rhcloud.com",
                    active: true
                },
                {
                    name: constants.configurationKeys.gameClientHost,
                    description: "Game static content host server",
                    value: "http://localhost:9080",
                    active: true
                }

            ],
            games: [{
                    name: "Slot",
                    gameId: "Slot_Server",
                    variant: "desktop",
                    active: true
                }],
            users: [{
                    provider: 'local',
                    name: 'Test User',
                    email: 'test',
                    password: 'test'
                }, {
                    provider: 'local',
                    role: 'admin',
                    name: 'admin',
                    email: 'admin',
                    password: 'admin'
                }]




        };
