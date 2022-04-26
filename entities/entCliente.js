
/**
 * @class EntCliente Rappresenta un cliente
 */
class EntCliente extends EntSupUser{

    /**
     * Crea un nuovo cliente
     * @param {string} email Email del cliente
     * @param {string} nome  Nome del cliente
     * @param {string} cognome Cognome del cliente
     * @param {number} telefono Telefono del cliente
     */
    constructor (email, nome, cognome, telefono) {
        super(email, nome, cognome, telefono);
    }
}

module.exports = User;