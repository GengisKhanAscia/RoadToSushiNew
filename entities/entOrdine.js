
/**
 * @class Ordine rappresenta un ordine
 */
 class EntOrdine{

    /**
     * Crea un nuovo ordine
     * @param {number} id       Id dell'ordine (serve anche se ho auto-increment in DB?)
     * @param {string} email    Email dell'ordine
     * @param {string} info     Contenuto dell'ordine
     * @param {number} telefono Telefono dell'ordine
     * @param {date}   data     Data dell'ordine
     * @param {string} ora      Ora dell'ordine
     * @param {string} stato    Stato dell'ordine
     * @param {number} totale   Ammontare da pagare dell'ordine
     */
    constructor (email, info, telefono, data, ora, stato, totale) {
        // this.id = id;
        this.email = email;
        this.info = info;
        this.telefono = telefono;
        this.data = data;
        this.ora = ora;
        this.stato = stato;
        this.totale = totale;
    }
}

module.exports = EntOrdine;