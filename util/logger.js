"use strict";

const now = require('./time');
const colors = require('colors');

/**
 * Debug message
 * @param {string} msg message to log
 */
function logDebug(msg) {
    console.debug(`[${now().black.bgWhite}] DEBUG: ${msg}`.gray);
}

/**
 * Info message
 * @param {string} msg message to log
 */
function logInfo(msg) {
    console.info(`[${now().black.bgWhite}] INFO: ${msg}`.white);
}

/**
 * Warning message
 * @param {string} msg message to log
 */
function logWarn(msg) {
    console.warn(`[${now().black.bgYellow}] WARN: ${msg}`.yellow);
}

/**
 * Error message
 * @param {string} msg message to log
 */
function logError(msg) {
    console.error(`[${now().white.bgRed}] ERROR: ${msg}`.red);
}

module.exports = { logDebug, logInfo, logWarn, logError };