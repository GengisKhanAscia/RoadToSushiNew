"use strict";

const db = require('../database');
const crypt = require('bcrypt');
const Utente = require('../entities/entSupUser');
const Cliente = require('../entities/entCliente');
const Personale = require('../entities/entPersonale');
const logger = require('../util/logger');


/**
 * Ottieni l'utente tramite email e password
 * @param {string} email Email dell'utente
 * @param {string} password Password dell'utente
 * @returns {Promise<EntUtente>} Utente.
 */

 function findUtenteByEmailAndPassword(email, password) { 
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Utenti WHERE Email = ?";

        db.get(query, [email], async function (err, row) {
            if (err) {
                // logger.logError(err);
                console.error("ERRORE: " + err);
                reject(err);
            } else if (row === undefined) {
                // logger.logWarn(`No such user with email: ${email}`);
                console.logWarn("Non c'è nessun utente con quella email!");
                resolve({ error: "Utente non trovato" });
            } else {
                const entUtente = new EntUtente(
                    row.Email,
                    row.Password,
                    row.Tipo_utente);

                const check = await crypt.compare(password, row.Password);

                resolve({ entUtente, check });
            }
        });
    });
}

/**
 * Ricerca Utente per email
 * @param {string} email Email dell'utente
 * @returns {Promise<EntUtente>} Utente
 */
 function findUtenteByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Utenti WHERE Email = ?";

        db.get(query, [email], function (err, row) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else if (row === undefined) {
                logger.logWarn(`Nessun utente con l'email: ${email}`);
                resolve({ error: "Utente non trovato" });
            } else {
                const utente = new EntUtente(
                    row.Email,
                    row.Password,
                    row.Tipo_utente);

                resolve(utente);
            }
        });
    });
}

/**
 * Ricerca Cliente in Utenti per email
 * @param {string} email Email dell'utente
 * @returns {Promise<EntUtente>} Utente
 */
 function findUtenteByEmailAndTipo_utente(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Utenti WHERE Email = ? AND Tipo_utente = 1";

        db.get(query, [email], function (err, row) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else if (row === undefined) {
                logger.logWarn(`Nessun cliente con l'email: ${email}`);
                resolve({ error: "Cliente non trovato" });
            } else {
                const cliente = new EntUtente(
                    row.Email,
                    row.Password,
                    row.Tipo_utente);

                resolve(cliente);
            }
        });
    });
}

/**
 * Aggiunge Utente al database.
 * @param {EntUtente} utente Utente da aggiungere al db
 * @returns {Promise<number>} Id dell'Utente inserito
 */
 function addClienteComeUtente(utente) {
    return new Promise(async (resolve, reject) => {
        const query = "INSERT INTO Utenti (Email, Password, Tipo_utente) VALUES (?, ?, 0)";

        utente.password = await crypt.hash(utente.password, 10);

        db.run(query, [
            utente.email,
            utente.password,
            utente.tipo_utente], function (err) {
                if (err) {
                    logger.logError(err);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}

/**
 * Aggiunge Cliente al database.
 * @param {EntCliente} cliente Cliente da aggiungere al db
 * @returns {Promise<number>} Id del Cliente inserito
 */
 function addCliente(cliente) {
    return new Promise(async (resolve, reject) => {
        const query = "INSERT INTO Clienti (Email, Nome, Cognome, Telefono) VALUES (?, ?, ?, ?)";

        db.run(query, [
            cliente.email,
            cliente.nome,
            cliente.cognome,
            cliente.telefono], function (err) {
                if (err) {
                    logger.logError(err);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}


module.exports = {findUtenteByEmailAndPassword, findUtenteByEmail, findUtenteByEmailAndTipo_utente, addClienteComeUtente, addCliente};