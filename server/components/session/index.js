/**
 * Session manager
 */

'use strict';
import * as uuid from 'node-uuid' ;

export function getSession(req, res,next){
    console.log("Session:getSession");
    
    if(req.Game.action === "init" && !req.session.user){
        req.session.user = "DEMO-"+ uuid.v1();
    }
    
    req.Game.userId = req.session.user;
    
    next();
}
export function managePreGameRequest(req, res,next){
    console.log("Session:managePreGameRequest");
    
    next();
}
export function managePostGameRequest(req, res,next){
    console.log("Session:managePostGameRequest");
    
    next();
}