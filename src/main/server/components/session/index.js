/**
 * Session manager
 */

'use strict';
import * as uuid from 'node-uuid' ;
import * as logger from '../logger';

export function getSession(req, res, next) {
  logger.log(0, "Session", "getSession", req.user);
  var userId = (req.user && req.user._id) ? req.user._id : req.session.user;
  if (!userId && req.Game.action === "init") {
    userId = req.Game.userId ? req.Game.userId : "DEMO-" + uuid.v1();
  } else {
    // log execption "Invalid Request"
  }
  req.Game.userId = userId;
  req.session.user = userId;

  logger.log(1, "Session", "getSession", req.Game.userId);
  next();
}
export function managePreGameRequest(req, res, next) {
  logger.log(0, "Session", "managePreGameRequest");

  next();
}
export function managePostGameRequest(req, res, next) {
  logger.log(0, "Session", "managePostGameRequest");

  next();
}
