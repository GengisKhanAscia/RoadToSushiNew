"use strict";

/************************** CONSTANTS *****************************/

/**
 * @type {HTMLButtonElement}
 */
 const pagaBtn = document.getElementById("paga-btn");

/**
 * @type {HTMLInputElement}
 */
const nome = document.getElementById("nomeCompleto");

/**
 * @type {HTMLSpanElement}
 */
const validazioneNome = document.getElementById("validazione-nomeCompleto");

/**
 * @type {HTMLInputElement}
 */
const numeroCarta = document.getElementById("numeroCarta");

/**
 * @type {HTMLSpanElement}
 */
const validazioneNumeroCarta = document.getElementById("validazione-numeroCarta");

/**
 * @type {HTMLInputElement}
 */
const scadenzaCarta = document.getElementById("scadenzaCarta");

/**
 * @type {HTMLSpanElement}
 */
const validazioneScadenzaCarta = document.getElementById("validazione-scadenzaCarta");

/**
 * @type {HTMLInputElement}
 */
const cvvCarta = document.getElementById("cvvCarta");

/**
 * @type {HTMLSpanElement}
 */
const validazioneCvvCarta = document.getElementById("validazione-cvvCarta");

/************************** INIZIALIZZAZIONE *****************************/

nome.classList.add('non-valido');
numeroCarta.classList.add('non-valido');
scadenzaCarta.classList.add('non-valido');
cvvCarta.classList.add('non-valido');
disableBtn(pagaBtn);
let valid = true;
const formCheckout = document.getElementById("formCheckout");

/************************** EVENT LISTENERS *****************************/

// Check Nome
nome.addEventListener("input", () => {
    if (!validaNomeCognome(nome.value)) {
        setValidationMessage(validazioneNome, "Inserisci un nome completo valido (max 50 caratteri)");
        disableBtn(pagaBtn);
        nome.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneNome);
        nome.classList.remove('non-valido');
        const nonValidi = formCheckout.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(pagaBtn);
            valid = true;
        }
    }
});

// Check Numero della Carta
numeroCarta.addEventListener("input", () => {
    if (!validaNumeroCarta(numeroCarta.value)) {
        setValidationMessage(validazioneNumeroCarta, "Inserisci un numero di carta valido (16 cifre)");
        disableBtn(pagaBtn);
        numeroCarta.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneNumeroCarta);
        numeroCarta.classList.remove('non-valido');
        const nonValidi = formCheckout.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(pagaBtn);
            valid = true;
        }
    }
});

// Check Scadenza della Carta
scadenzaCarta.addEventListener("input", () => {
    if (!validaScadenzaCarta(scadenzaCarta.value)) {
        setValidationMessage(validazioneScadenzaCarta, "Inserisci una scadenza valida (dal mese corrente in avanti)");
        disableBtn(pagaBtn);
        scadenzaCarta.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneScadenzaCarta);
        scadenzaCarta.classList.remove('non-valido');
        const nonValidi = formCheckout.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(pagaBtn);
            valid = true;
        }
    }
});

// Check CVV Carta
cvvCarta.addEventListener("input", () => {
    if (!validaCVV(cvvCarta.value)) {
        setValidationMessage(validazioneCvvCarta, "Inserisci un CVV valido (3 cifre)");
        disableBtn(pagaBtn);
        cvvCarta.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneCvvCarta);
        cvvCarta.classList.remove('non-valido');
        const nonValidi = formCheckout.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(pagaBtn);
            valid = true;
        }
    }
});

pagaBtn.addEventListener("click", (e) => {
    if (!valid) {
        e.preventDefault();
    }
});

/************************** VALIDATION *****************************/

/**
 * Valida il nome & cognome sulla carta
 * @param {string} text Il testo da controllare
 * @returns true Se il nome & cognome è valido, false altrimenti
 */
 function validaNomeCognome(text) {
    return /^[a-zA-Z ]{1,50}$/.test(text);
}

/**
 * Valida il numero della carta di pagamento
 * @param {number} numeroCarta Numero da controllare
 * @returns true Se il numero è valido, false altrimenti
 */
function validaNumeroCarta(numeroCarta) {
    return /^[0-9]{16}$/.test(numeroCarta);
}

/**
 * Valida la data di scadenza di una carta
 * @param {date} date Data da controllare
 * @returns vero se la data di scadenza della carta è corretta, false altrimenti 
 */
function validaScadenzaCarta(date) {
    const now = new Date();
    const mese = now.getMonth() + 1;
    const anno = now.getFullYear();

    const exDate = new Date(date);
    const exMese = exDate.getMonth() + 1;
    const exAnno = exDate.getFullYear();

    return /^\d{4}-\d{2}$/.test(date) && (exAnno > anno || (exAnno === anno && exMese >= mese));
}

/**
 * Valida il CVV della carta
 * @param {string} cvv 
 * @returns vero se il cvv è valido, false altrimenti
 */
function validaCVV(cvv) {
    return /^[0-9]{3}$/.test(cvv);
}

/**
 * Imposta il messaggio di validazione per il dato elemento
 * @param {HTMLSpanElement} element 
 * @param {string} message 
 */
 function setValidationMessage(element, message) {
    element.innerHTML = message;
}

/**
 * "Pulisce" il messaggio di validazione del dato elemento HTML 
 * @param {HTMLSpanElement} validationElement Elemento HTML di cui "pulire" il messaggio di validazione
 */
function clearValidationMsg(validationElement) {
    validationElement.innerHTML = "";
}

/**
 * Abilita un bottone
 * @param {HTMLButtonElement} btn Bottone da abilitare
 */
function enableBtn(btn) {
    btn.removeAttribute("disabled");
}

/**
 * Disabilita un bottone
 * @param {HTMLButtonElement} btn Bottone da disabilitare
 */
function disableBtn(btn) {
    btn.setAttribute("disabled", "true");
}