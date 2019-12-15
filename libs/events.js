"use strict"
const axon  = require('pm2-axon');
const sub = axon.socket('sub-emitter');
const exec = require('child_process').exec;

let events = {};

/**
 * Get ~/.pm2/pub.sock path
 *
 * @param {Function} callback
 * @return {Function} callback
 */

events.getSockPath = callback => {
    const pm2Home = process.env.PM2_HOME;
    let command = pm2Home === undefined ? 'ls ~/.pm2/pub.sock' : `ls ${pm2Home}/pub.sock`;
    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            let err = error || stderr;
            return callback(err);
        }

        return callback(null, stdout);
    });
};

/**
 * Connect with sock and catch events 
 *
 * @param {String} sockPath
 * @param {Function} event
 * @param {Function} error
 */

events.main = (sockPath, event, error) => {
    sub.connect(sockPath);

    sub.on('process:*', (e, p) => {
        event && event(p.event, p);
    });

    sub.on('error', e => {
        error && error(e);
    });
};

/**
 * Expose events
 */

module.exports = events;
