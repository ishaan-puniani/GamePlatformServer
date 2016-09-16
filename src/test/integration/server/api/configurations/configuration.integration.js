'use strict';

var app = require('../../../../../main/server/index.js');
import request from 'supertest';

var newConfiguration;

describe('Configuration API:', function() {

  describe('GET /api/configurations', function() {
    var configurations;

    beforeEach(function(done) {
      request(app)
        .get('/api/configurations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          configurations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(configurations).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/configurations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/configurations')
        .send({
          name: 'New Configuration',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newConfiguration = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newConfiguration.name).to.equal('New Configuration');
      expect(newConfiguration.info).to.equal('This is the brand new thing!!!');
    });

  });

  describe('GET /api/configurations/:id', function() {
    var thing;

    beforeEach(function(done) {
      request(app)
        .get('/api/configurations/' + newConfiguration._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          thing = res.body;
          done();
        });
    });

    afterEach(function() {
      thing = {};
    });

    it('should respond with the requested thing', function() {
      expect(thing.name).to.equal('New Configuration');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });

  });

  describe('PUT /api/configurations/:id', function() {
    var updatedConfiguration;

    beforeEach(function(done) {
      request(app)
        .put('/api/configurations/' + newConfiguration._id)
        .send({
          name: 'Updated Configuration',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedConfiguration = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedConfiguration = {};
    });

    it('should respond with the updated thing', function() {
      expect(updatedConfiguration.name).to.equal('Updated Configuration');
      expect(updatedConfiguration.info).to.equal('This is the updated thing!!!');
    });

  });

  describe('DELETE /api/configurations/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/configurations/' + newConfiguration._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when thing does not exist', function(done) {
      request(app)
        .delete('/api/configurations/' + newConfiguration._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
