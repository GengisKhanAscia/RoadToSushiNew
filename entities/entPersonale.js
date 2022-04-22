/**
 * @class EntPersonale Rappresenta un membro del personale
 */
 class EntPersonale extends EntUtente{

    /**
     * Creaa un nuovo membro del personale
     * @param {number} email Email dell'utente
     * @param {string} nome  Nome dell'utente
     * @param {string} cognome Cognome dell'utente
     * @param {string} telefono Telefono dell'utente
     */
    constructor (email, nome, cognome, telefono) {
        super(email, nome, cognome, telefono);
    }
}

module.exports = User;