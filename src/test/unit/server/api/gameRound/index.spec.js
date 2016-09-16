'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var gameRoundCtrlStub = {
  index: 'gameRoundCtrl.index',
  show: 'gameRoundCtrl.show',
  create: 'gameRoundCtrl.create',
  update: 'gameRoundCtrl.update',
  destroy: 'gameRoundCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var gameRoundIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './gameRound.controller': gameRoundCtrlStub
});

describe('Thing API Router:', function() {

  it('should return an express router instance', function() {
    expect(gameRoundIndex).to.equal(routerStub);
  });

  describe('GET /api/gameRounds', function() {

    it('should route to gameRound.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'gameRoundCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/gameRounds/:id', function() {

    it('should route to gameRound.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'gameRoundCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/gameRounds', function() {

    it('should route to gameRound.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'gameRoundCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/gameRounds/:id', function() {

    it('should route to gameRound.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'gameRoundCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/gameRounds/:id', function() {

    it('should route to gameRound.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'gameRoundCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/gameRounds/:id', function() {

    it('should route to gameRound.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'gameRoundCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
