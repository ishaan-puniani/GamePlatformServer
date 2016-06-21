/**
 * Logger
 */

'use strict';

/*
 * 
 * @param {type} typ
 * @param {type} cls
 * @param {type} methd
 * @param {type} msg
 * @returns {undefined}typ = 1 means log in production, 0 means log in debug only 
 */
export function log(typ, cls,methd,msg){
    typ = typ === 0 ? "debug" : "prod";
    console.log(typ +" | "+cls+" : "+methd+" - "+msg);
}