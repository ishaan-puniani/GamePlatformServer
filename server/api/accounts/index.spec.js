'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var accountsCtrlStub = {
  index: 'accountsCtrl.index',
  show: 'accountsCtrl.show',
  create: 'accountsCtrl.create',
  update: 'accountsCtrl.update',
  destroy: 'accountsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var accountsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './accounts.controller': accountsCtrlStub
});

describe('Thing API Router:', function() {

  it('should return an express router instance', function() {
    expect(accountsIndex).to.equal(routerStub);
  });

  describe('GET /api/accounts', function() {

    it('should route to accounts.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'accountsCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/accounts/:id', function() {

    it('should route to accounts.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'accountsCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/accounts', function() {

    it('should route to accounts.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'accountsCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/accounts/:id', function() {

    it('should route to accounts.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'accountsCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/accounts/:id', function() {

    it('should route to accounts.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'accountsCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/accounts/:id', function() {

    it('should route to accounts.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'accountsCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
