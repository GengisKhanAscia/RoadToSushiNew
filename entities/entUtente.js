/**
 * @class EntUtente Rappresenta i dati di un utente
 */
 class EntPersonale extends EntSupUser{

    /**
     * Crea un nuovo membro del personale
     * @param {string} email Email dell'utente
     * @param {string} password  Nome dell'utente
     * @param {number}    tipo_utente Cognome dell'utente
     */
    constructor (email, password, tipo_utente) {
        this.email = email;
        this.password = password;
        this.tipo_utente = tipo_utente;
    }
}