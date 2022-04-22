
/**
 * @class User rappresenta un utente
 */
 class EntUtente{

    /**
     * Crea un nuovo utente
     * @param {number} email Email dell'utente
     * @param {string} nome  Nome dell'utente
     * @param {string} cognome Cognome dell'utente
     * @param {string} telefono Telefono dell'utente
     */
    constructor (email, nome, cognome, telefono) {
        this.email = email;
        this.nome = nome;
        this.cognome = cognome;
        this.telefono = telefono;
    }
}

module.exports = User;