"use strict";

const Piatto = require('./entPiatto');

/**
 * @class EntCarrello Rappresenta un carrello
 */
 class EntCarrello{

    /**
     * Crea un nuovo carrello
     * @param {Piatto} piatto Piatto aggiunto al carrello
     */
    constructor (piatto) {
        this.items = [{
            piatto: piatto.nome
        }];
        this.totale = piatto.prezzo;
    }
}

module.exports = EntCarrello;