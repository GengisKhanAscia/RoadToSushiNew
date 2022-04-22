
/**
 * @class EntCliente Rappresenta un cliente
 */
class EntCliente extends EntUtente{

    /**
     * Creaa un nuovo cliente
     * @param {number} email Email dell'utente
     * @param {string} nome  Nome dell'utente
     * @param {string} cognome Cognome dell'utente
     * @param {string} telefono Telefono dell'utente
     * @param {string} password Password dell'utente
     */
    constructor (email, nome, cognome, telefono, password,) {
        super(email, nome, cognome, telefono, password);
    }
}

module.exports = User;