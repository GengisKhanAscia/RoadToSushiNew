"use strict";

const moment = require('moment');

/**
 * Ritorna una stringa rappresentante l'orario corrente
 * @returns {string} Orario corrente
 */
function now(){
    return moment().format();
}

module.exports = now;