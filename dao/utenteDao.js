"use strict";

const db = require('../database');
const crypt = require('bcrypt');
const Utente = require('../entities/entSupUser');
const Cliente = require('../entities/entCliente');
const Personale = require('../entities/entPersonale');
const logger = require('../util/logger');


/**
 * Ottieni il cliente tramite email e password
 * @param {string} email Email del cliente
 * @param {string} password Password del cliente
 * @returns {Promise<Cliente>} Cliente.
 */
/*
 function findClienteByEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Clienti WHERE email = ?";

        db.get(query, [email], async function (err, row) {
            if (err) {
                // logger.logError(err);
                console.error("ERRORE: " + err);
                reject(err);
            } else if (row === undefined) {
                // logger.logWarn(`No such user with email: ${email}`);
                console.logWarn("Non c'è nessun utente con quella email!");
                resolve({ error: "Cliente non trovato" });
            } else {
                const entCliente = new entCliente(
                    row.Email,
                    row.Nome,
                    row.Cognome,
                    row.Telefono,
                    row.Password);

                const check = await crypt.compare(password, row.Password);

                resolve({ entCliente, check });
            }
        });
    });
}
*/

/**
 * Ricerca Cliente per email
 * @param {string} email Email del cliente
 * @returns {Promise<EntCliente>} Cliente
 */
 function findClienteByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Clienti WHERE Email = ?";

        db.get(query, [email], function (err, row) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else if (row === undefined) {
                logger.logWarn(`Nessun cliente con l'email: ${email}`);
                resolve({ error: "Cliente non trovato" });
            } else {
                const cliente = new EntCliente(
                    row.email,
                    row.nome,
                    row.cognome,
                    row.telefono);

                resolve(cliente);
            }
        });
    });
}

module.exports = {findClienteByEmailAndPassword};