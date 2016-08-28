'use strict';

var app = require('../..');
import request from 'supertest';

var newAccounts;

describe('Accounts API:', function() {

  describe('GET /api/accounts', function() {
    var accounts;

    beforeEach(function(done) {
      request(app)
        .get('/api/accounts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          accounts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(accounts).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/accounts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/accounts')
        .send({
          name: 'New Accounts',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAccounts = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newAccounts.name).to.equal('New Accounts');
      expect(newAccounts.info).to.equal('This is the brand new thing!!!');
    });

  });

  describe('GET /api/accounts/:id', function() {
    var thing;

    beforeEach(function(done) {
      request(app)
        .get('/api/accounts/' + newAccounts._id)
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
      expect(thing.name).to.equal('New Accounts');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });

  });

  describe('PUT /api/accounts/:id', function() {
    var updatedAccounts;

    beforeEach(function(done) {
      request(app)
        .put('/api/accounts/' + newAccounts._id)
        .send({
          name: 'Updated Accounts',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAccounts = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAccounts = {};
    });

    it('should respond with the updated thing', function() {
      expect(updatedAccounts.name).to.equal('Updated Accounts');
      expect(updatedAccounts.info).to.equal('This is the updated thing!!!');
    });

  });

  describe('DELETE /api/accounts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/accounts/' + newAccounts._id)
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
        .delete('/api/accounts/' + newAccounts._id)
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
