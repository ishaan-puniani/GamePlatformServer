/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

console.log(process.env.MONGODB_URI);
console.log('http://'+process.env.GES_PORT_80_TCP_ADDR+':'+process.env.GES_PORT_80_TCP_PORT);
console.log('http://'+process.env.GES_PORT_8080_TCP_ADDR+':'+process.env.GES_PORT_8080_TCP_PORT);
console.log('http://'+process.env.GES_PORT_81_TCP_ADDR+':'+process.env.GES_PORT_81_TCP_PORT);

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
