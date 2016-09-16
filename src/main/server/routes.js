/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

var swaggerJSDoc = require('swagger-jsdoc');

export default function (app) {
  // Insert routes below
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.use('/api/things', require('./api/thing'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/gameRounds', require('./api/gameRound'));
  app.use('/api/wallet', require('./api/wallet'));

  var options = {
    swaggerDefinition: {
      info: {
        title: 'Game Server Platform', // Title (required)
        version: '1.0.0', // Version (required)
      },
    },
    apis: ['./routes.js'], // Path to the API docs
  };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  var swaggerSpec = swaggerJSDoc(options);
  app.get('/api/docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/docs')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/external/swagger-ui/index.html'));
    });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });


}
