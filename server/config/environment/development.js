'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/gameplatformserver-dev'
  },
  ges:{
      uri: process.env.GES_URI || 
           "http://gameserver-gameolive.rhcloud.com"
      
  },
  // Seed database on startup
  seedDB: true

};
