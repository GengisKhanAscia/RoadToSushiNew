const EntSupUser = require('./entSupUser');

/**
 * @class EntPersonale Rappresenta un membro del personale
 * @extends EntSupUser Estende la classe base per tutti gli Utenti
 */
 class EntPersonale extends EntSupUser{

    /**
     * Crea un nuovo membro del personale
     * @param {string} email Email del membro del personale
     * @param {string} nome  Nome del membro del personale
     * @param {string} cognome Cognome del membro del personale
     * @param {number} telefono Telefono del membro del personale
     * @param {blob}   immagine Immagine (opzionale) del membro del personale
     */
    constructor (email, nome, cognome, telefono, immagine) {
        super(email, nome, cognome, telefono);
        this.immagine = immagine;
    }
}

module.exports = EntPersonale;