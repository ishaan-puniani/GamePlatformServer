'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var configurationCtrlStub = {
  index: 'configurationCtrl.index',
  show: 'configurationCtrl.show',
  create: 'configurationCtrl.create',
  update: 'configurationCtrl.update',
  destroy: 'configurationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var configurationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './configuration.controller': configurationCtrlStub
});

describe('Thing API Router:', function() {

  it('should return an express router instance', function() {
    expect(configurationIndex).to.equal(routerStub);
  });

  describe('GET /api/configurations', function() {

    it('should route to configuration.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'configurationCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/configurations/:id', function() {

    it('should route to configuration.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'configurationCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/configurations', function() {

    it('should route to configuration.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'configurationCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/configurations/:id', function() {

    it('should route to configuration.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'configurationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/configurations/:id', function() {

    it('should route to configuration.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'configurationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/configurations/:id', function() {

    it('should route to configuration.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'configurationCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
