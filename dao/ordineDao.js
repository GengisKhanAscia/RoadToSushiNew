"use strict";

const db = require('../database');
const crypt = require('bcrypt');
const logger = require('../util/logger');
const EntOrdine = require('../entities/entOrdine');

/************************** ORDINE *****************************/

/**
 * Aggiunge Ordine al database.
 * @param {EntOrdine} ordine Ordine da aggiungere al db
 * @returns {Promise<Number>} Id dell'ordine inserito
 */
 function addOrdine(ordine) {
    return new Promise(async (resolve, reject) => {
        const query = "INSERT INTO Ordine (Email, Info, Telefono, Data, Ora, Stato, Totale) VALUES (?, ?, ?, ?, ?, ?, ?)";

        db.run(query, [
            ordine.email,
            ordine.info,
            ordine.telefono,
            ordine.data,
            ordine.ora,
            ordine.stato,
            ordine.totale,], function (err) {
                if (err) {
                    logger.logError(err);
                    reject(err);
                } else {
                    resolve(ordine.lastID); 
                }
            });
    });
}

module.exports = {addOrdine};