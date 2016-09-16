'use strict';

var app = require('../../../../../main/server/index.js');
import request from 'supertest';

var newWallet;

describe('Wallet API:', function() {

  describe('GET /api/wallets', function() {
    var wallets;

    beforeEach(function(done) {
      request(app)
        .get('/api/wallets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          wallets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(wallets).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/wallets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/wallets')
        .send({
          name: 'New Wallet',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newWallet = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newWallet.name).to.equal('New Wallet');
      expect(newWallet.info).to.equal('This is the brand new thing!!!');
    });

  });

  describe('GET /api/wallets/:id', function() {
    var thing;

    beforeEach(function(done) {
      request(app)
        .get('/api/wallets/' + newWallet._id)
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
      expect(thing.name).to.equal('New Wallet');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });

  });

  describe('PUT /api/wallets/:id', function() {
    var updatedWallet;

    beforeEach(function(done) {
      request(app)
        .put('/api/wallets/' + newWallet._id)
        .send({
          name: 'Updated Wallet',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWallet = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWallet = {};
    });

    it('should respond with the updated thing', function() {
      expect(updatedWallet.name).to.equal('Updated Wallet');
      expect(updatedWallet.info).to.equal('This is the updated thing!!!');
    });

  });

  describe('DELETE /api/wallets/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/wallets/' + newWallet._id)
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
        .delete('/api/wallets/' + newWallet._id)
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
