"use strict";

const db = require('../database');
const logger = require('../util/logger');
const EntOrdine = require('../entities/entOrdine');
const orderStatus = require('../entities/enumeratives/statoOrderType');

/************************** ORDINE *****************************/

/**
 * Aggiunge Ordine al DB
 * @param {EntOrdine} ordine Ordine da aggiungere al DB
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
            ordine.totale
        ], async function (err) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else {
                logger.logInfo(`Aggiunto ordine con l'id: ${this.lastID}`);
                resolve(this.lastID); 
            }
        });
    });
}

/**
 * Modifica Ordine nel DB (Cambia lo Stato da [INVIATO] 'In preparazione' a [PRONTO] 'Pronto')
 * @param {Number} id Id dell'ordine da aggiornare nel DB
 * @returns {Promise<Number>} Id dell'ordine aggiornato
 */
 function updateOrdine(id) {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Ordine SET Stato = ? WHERE id = ?";

        db.run(query, [
            orderStatus.PRONTO,
            id
        ], function (err) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else {
                logger.logInfo(`Aggiornato ordine con l'id: ${this.lastID}`);
                resolve(id); 
            }
        });
    });
}

/**
 * Cancella un ordine dal DB
 * @param {number} id Id dell'ordine da cancellare nel DB
 * @returns {Promise<Number>} Id dell'ordine da eliminare
 */
 function deleteOrdine(id) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM Ordine WHERE id = ?";

        db.run(query, [id], function (err) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else {
                resolve(id);
            }
        });
    });
}

/**
 * Trova tutti gli ordini presenti nel DB
 * @returns {Promise<EntOrdine[]>} Array di Ordini
 */
 function findAllOrdini() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Ordine ORDER BY Data DESC, Ora DESC";

        db.all(query, function (err, rows) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else if (rows === undefined || rows.length === 0) {
                logger.logWarn(`Nessun ordine trovato.`);
                resolve([]);
            } else {
                const ordini = [];

                rows.forEach(function (row) {
                    const ordine = new EntOrdine(
                        row.Id,
                        row.Email,
                        row.Info,
                        row.Telefono,
                        row.Data,
                        row.Ora,
                        row.Stato,
                        row.Totale);

                    ordini.push(ordine);
                });
                resolve(ordini);
            }
        });
    });
}

/**
 * Trova tutti gli ordini 'In preparazione' nel DB
 * @returns {Promise<EntOrdine[]>} Array di Ordini
 */
 function findAllOrdiniInPreparazione() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Ordine WHERE Stato = 'In preparazione' ORDER BY Data DESC, Ora DESC";

        db.all(query, function (err, rows) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else if (rows === undefined || rows.length === 0) {
                logger.logWarn(`Nessun ordine IN PREPARAZIONE trovato.`);
                resolve([]);
            } else {
                const ordini = [];

                rows.forEach(function (row) {
                    const ordine = new EntOrdine(
                        row.Id,
                        row.Email,
                        row.Info,
                        row.Telefono,
                        row.Data,
                        row.Ora,
                        row.Stato,
                        row.Totale);

                    ordini.push(ordine);
                });
                resolve(ordini);
            }
        });
    });
}

/**
 * Trova tutti gli ordini 'Pronto' nel DB
 * @returns {Promise<EntOrdine[]>} Array di Ordini
 */
 function findAllOrdiniPronto() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Ordine WHERE Stato = 'Pronto' ORDER BY Data DESC, Ora DESC";

        db.all(query, function (err, rows) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else if (rows === undefined || rows.length === 0) {
                logger.logWarn(`Nessun ordine PRONTO trovato.`);
                resolve([]);
            } else {
                const ordini = [];

                rows.forEach(function (row) {
                    const ordine = new EntOrdine(
                        row.Id,
                        row.Email,
                        row.Info,
                        row.Telefono,
                        row.Data,
                        row.Ora,
                        row.Stato,
                        row.Totale);

                    ordini.push(ordine);
                });
                resolve(ordini);
            }
        });
    });
}

/**
 * Trova tutti gli ordini di un cliente
 * @param {string} email Email del cliente
 * @returns {Promise<EntOrdine[]>} Array di Ordini
 */
 function findOrdiniByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Ordine WHERE Email = ? ORDER BY Data DESC, Ora DESC";

        db.all(query, [email], function (err, rows) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else if (rows === undefined || rows.length === 0) {
                logger.logWarn(`Nessun ordine per il Cliente: ${email}`);
                resolve([]);
            } else {
                const ordini = [];

                rows.forEach(function (row) {
                    const ordine = new EntOrdine(
                        row.Id,
                        row.Email,
                        row.Info,
                        row.Telefono,
                        row.Data,
                        row.Ora,
                        row.Stato,
                        row.Totale);

                    ordini.push(ordine);
                });
                resolve(ordini);
            }
        });
    });
}

/**
 * Trova tutti gli ordini 'In preparazione' di un Cliente
 * @param {string} email Email del cliente
 * @returns {Promise<EntOrdine[]>} Array di Ordini
 */
 function findOrdiniClienteInPreparazioneByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Ordine WHERE Email = ? AND Stato = 'In preparazione' ORDER BY Data DESC, Ora DESC";

        db.all(query, [email], function (err, rows) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else if (rows === undefined || rows.length === 0) {
                logger.logWarn(`Nessun ordine IN PREPARAZIONE per il Cliente: ${email}`);
                resolve([]);
            } else {
                const ordini = [];

                rows.forEach(function (row) {
                    const ordine = new EntOrdine(
                        row.Id,
                        row.Email,
                        row.Info,
                        row.Telefono,
                        row.Data,
                        row.Ora,
                        row.Stato,
                        row.Totale);

                    ordini.push(ordine);
                });
                resolve(ordini);
            }
        });
    });
}

/**
 * Trova tutti gli ordini 'Pronto' di un Cliente
 * @param {string} email Email del cliente
 * @returns {Promise<EntOrdine[]>} Array di Ordini
 */
 function findOrdiniClienteProntoByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Ordine WHERE Email = ? AND Stato = 'Pronto' ORDER BY Data DESC, Ora DESC";

        db.all(query, [email], function (err, rows) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else if (rows === undefined || rows.length === 0) {
                logger.logWarn(`Nessun ordine PRONTO per il Cliente: ${email}`);
                resolve([]);
            } else {
                const ordini = [];

                rows.forEach(function (row) {
                    const ordine = new EntOrdine(
                        row.Id,
                        row.Email,
                        row.Info,
                        row.Telefono,
                        row.Data,
                        row.Ora,
                        row.Stato,
                        row.Totale);

                    ordini.push(ordine);
                });
                resolve(ordini);
            }
        });
    });
}

module.exports = {addOrdine, updateOrdine, deleteOrdine, findAllOrdiniInPreparazione, findAllOrdiniPronto, findOrdiniByEmail, findAllOrdini, findOrdiniClienteInPreparazioneByEmail, findOrdiniClienteProntoByEmail};