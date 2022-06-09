"use strict";

/************************** CONSTANTS *****************************/

/**
 * @type {HTMLButtonElement}
 */
 const pagaBtn = document.getElementById("paga-btn");

/**
 * @type {HTMLInputElement}
 */
const nome = document.getElementById("nome");

/**
 * @type {HTMLSpanElement}
 */
const validazioneNome = document.getElementById("validazione-nome");

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
const validazionescadenzaCarta = document.getElementById("validazione-scadenzaCarta");

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
        setValidationMessage(validazioneNome, "Inserisci un nome valido (max 50 caratteri)");
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
    if (!validaNumeroCarta(scadenzaCarta.value)) {
        setValidationMessage(validazionescadenzaCarta, "Inserisci una scadenza valida (dal mese corrente in avanti)");
        disableBtn(pagaBtn);
        numeroCarta.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneNumeroCarta);
        scadenzaCarta.classList.remove('non-valido');
        const nonValidi = formCheckout.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(pagaBtn);
            valid = true;
        }
    }
});

expirationDate.addEventListener("input", () => {
    if (!validateExpirationDate(expirationDate.value)) {
        setValidationMessage(expirationDateValidation, "Please enter a valid expiration date");
        disableBtn(payBtn);
        valid = false;
    } else {
        clearValidationMsg(expirationDateValidation);
        enableBtn(payBtn);
        valid = true;
    }
});

cvv.addEventListener("input", () => {
    if (!validateCVV(cvv.value)) {
        setValidationMessage(cvvValidation, "Please enter a valid CVV");
        disableBtn(payBtn);
        valid = false;
    } else {
        clearValidationMsg(cvvValidation);
        enableBtn(payBtn);
        valid = true;
    }
});

payBtn.addEventListener("submit", (e) => {
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
    return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(numeroCarta);
}

/**
 * Validates a card expiration date
 * @param {string} date date to be checked
 * @returns true if date is a valid card expiration date, false otherwise
 */
function validateExpirationDate(date) {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const exDate = new Date(date);
    const exMonth = exDate.getMonth() + 1;
    const exYear = exDate.getFullYear();

    return /^\d{4}-\d{2}$/.test(date) && (exYear > year || (exYear === year && exMonth >= month));
}

/**
 * Validates a cvv number
 * @param {string} cvv 
 * @returns true if cvv is a valid cvv, false otherwise
 */
function validateCVV(cvv) {
    return /^[0-9]{3,4}$/.test(cvv);
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