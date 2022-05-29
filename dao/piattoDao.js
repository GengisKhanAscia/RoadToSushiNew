"use strict";

const db = require('../database');
const crypt = require('bcrypt');
const logger = require('../util/logger');
const EntPiatto = require('../entities/entPiatto');

/************************** PIATTO *****************************/

/**
 * Ricerca Piatto in Piatti per nome
 * @param {string} nome Nome del piatto
 * @returns {Promise<EntPiatto>} Piatto
 */
 function findPiattoByNome(nome){
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Piatti WHERE Nome = ?";

        db.get(query, [nome], function (err, row) {
            if(err){
                logger.logError(err);
                reject(err);
            }
            else if (row === undefined) {
                logger.logWarn(`Nessun piatto con il nome: ${nome}`);
                resolve({error: "Piatto non trovato"});
            } else {
                const piatto = new EntPiatto(
                    row.Nome,
                    row.Prezzo,
                    row.Ingredienti,
                    row.Immagine);

                resolve(piatto);
            }
        });
    });
}

/**
 * Aggiunge Piatto al database.
 * @param {EntPiatto} piatto Piatto da aggiungere al db
 * @returns {Promise<String>} Nome del Piatto inserito
 */
 function addPiatto(piatto) {
    return new Promise(async (resolve, reject) => {
        const query = "INSERT INTO Piatti (Nome, Prezzo, Ingredienti, Immagine) VALUES (?, ?, ?, ?)";

        db.run(query, [
            piatto.nome,
            piatto.prezzo,
            piatto.ingredienti,
            piatto.immagine,], function (err) {
                if (err) {
                    logger.logError(err);
                    reject(err);
                } else {
                    resolve(piatto.nome); 
                }
            });
    });
}

module.exports = {findPiattoByNome, addPiatto};