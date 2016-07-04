'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/gameplatformserver-dev'
  },
  ges:{
      uri: process.env.GES_PORT_8080_TCP_ADDR ? 'http://'+process.env.GES_PORT_8080_TCP_ADDR+':'+process.env.GES_PORT_8080_TCP_PORT : 
           "http://gameserver-gameolive.rhcloud.com"
      
  },
  // Seed database on startup
  seedDB: true

};
