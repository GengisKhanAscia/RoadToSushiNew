"use strict";

const db = require('../database');
const crypt = require('bcrypt');
const logger = require('../util/logger');
const EntUtente = require('../entities/entUtente');
const EntCliente = require('../entities/entCliente');
const EntPersonale = require('../entities/entPersonale');

/************************** UTENTE *****************************/

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
                logger.logError(err);
                reject(err);
            } else if (row === undefined) {
                logger.logWarn(`Non c'è nessun utente con quella email: ${email}`);
                resolve({ error: "Utente non trovato" });
            } else {
                const user = new EntUtente( // Lasciare 'user'
                    row.Email,
                    row.Password,
                    row.Tipo_utente);

                const check = await crypt.compare(password, row.Password);

                resolve({ user, check });
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
 * Ricerca Cliente {0} in Utenti per email e tipo_utente
 * @param {string} email Email dell'utente
 * @returns {Promise<EntUtente>} Utente
 */
 function findClienteByEmailAndTipo_utente(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Utenti WHERE Email = ? AND Tipo_utente = 0";

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
 * Ricerca Personale {1} in Utenti per email e tipo_utente
 * @param {string} email Email dell'utente
 * @returns {Promise<EntUtente>} Utente
 */
 function findPersonaleByEmailAndTipo_utente(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Utenti WHERE Email = ? AND Tipo_utente = 1";

        db.get(query, [email], function (err, row) {
            if (err) {
                logger.logError(err);
                reject(err);
            } else if (row === undefined) {
                logger.logWarn(`Nessun membro del personale con l'email: ${email}`);
                resolve({ error: "Membro del personale non trovato" });
            } else {
                const personale = new EntUtente(
                    row.Email,
                    row.Password,
                    row.Tipo_utente);

                resolve(personale);
            }
        });
    });
}

/**
 * Aggiunge Utente {Cliente{0}} al database.
 * @param {EntUtente} utente Utente da aggiungere al db
 * @returns {Promise<String>} Email dell'Utente inserito
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
                    resolve(utente.email); 
                }
            });
    });
}

/**
 * Aggiunge Utente {Membro del Personale{1}} al database.
 * @param {EntUtente} utente Utente da aggiungere al db
 * @returns {Promise<String>} Email dell'Utente inserito
 */
 function addPersonaleComeUtente(utente) {
    return new Promise(async (resolve, reject) => {
        const query = "INSERT INTO Utenti (Email, Password, Tipo_utente) VALUES (?, ?, 1)";

        utente.password = await crypt.hash(utente.password, 10);

        db.run(query, [
            utente.email,
            utente.password,
            utente.tipo_utente], function (err) {
                if (err) {
                    logger.logError(err);
                    reject(err);
                } else {
                    resolve(utente.email); 
                }
            });
    });
}

/************************** CLIENTE *****************************/

/**
 * Aggiunge Cliente al database.
 * @param {EntCliente} cliente Cliente da aggiungere al db
 * @returns {Promise<String>} Email del Cliente inserito
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
                    resolve(cliente.email); 
                }
            });
    });
}

/************************** PERSONALE *****************************/

/**
 * Aggiunge Membro del Personale al database.
 * @param {EntPersonale} personale Personale da aggiungere al db
 * @returns {Promise<String>} Email del Membro del Personale inserito
 */
 function addPersonale(personale) {
    return new Promise(async (resolve, reject) => {
        const query = "INSERT INTO Personale (Email, Nome, Cognome, Telefono, Immagine) VALUES (?, ?, ?, ?, ?)";

        db.run(query, [
            personale.email,
            personale.nome,
            personale.cognome,
            personale.telefono,
            personale.immagine], function (err) {
                if (err) {
                    logger.logError(err);
                    reject(err);
                } else {
                    resolve(personale.email);
                }
            });
    });
}

module.exports = {findUtenteByEmailAndPassword, findUtenteByEmail, findClienteByEmailAndTipo_utente, findPersonaleByEmailAndTipo_utente, addClienteComeUtente, addPersonaleComeUtente, addCliente, addPersonale};