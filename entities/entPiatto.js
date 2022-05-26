
/**
 * @class Piatto rappresenta un piatto
 */
 class EntPiatto{

    /**
     * Crea un nuovo utente
     * @param {string} nome Nome del piatto
     * @param {number} prezzo Prezzo del piatto
     * @param {text}   ingredienti Ingredienti del piatto
     * @param {blob}   immagine Immagine del piatto
     */
    constructor (nome, prezzo, ingredienti, immagine) {
        this.nome = nome;
        this.prezzo = prezzo;
        this.ingredienti = ingredienti;
        this.immagine = immagine;
    }
}

module.exports = EntPiatto;