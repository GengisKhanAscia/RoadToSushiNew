"use strict";

const db = require('../database');
const crypt = require('bcrypt');
const Utente = require('../entities/entUtente');
const Cliente = require('../entities/entCliente');
const Personale = require('../entities/entPersonale');
// const logger = require('../util/logger');

/**
 * Ottieni il cliente tramite email e password
 * @param {string} email Email del cliente
 * @param {string} password Password del cliente
 * @returns {Promise<Cliente>} Cliente.
 */
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

module.exports = {findClienteByEmailAndPassword};