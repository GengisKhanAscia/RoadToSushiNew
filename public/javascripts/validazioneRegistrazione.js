"use strict";

/************************** CONSTANTS *****************************/

/**
 * @type {HTMLButtonElement}
 */
const signupBtn = document.getElementById("signup-btn-cliente");

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
const cognome = document.getElementById("cognome");

/**
 * @type {HTMLSpanElement}
 */
const validazioneCognome = document.getElementById("validazione-cognome");

/**
 * @type {HTMLInputElement}
 */
const email = document.getElementById("email");

/**
 * @type {HTMLSpanElement}
 */
const validazioneEmail = document.getElementById("validazione-email");

/**
 * @type {HTMLInputElement}
 */
const password = document.getElementById("password");

/**
 * @type {HTMLSpanElement}
 */
const validazionePassword = document.getElementById("validazione-password");

/**
 * @type {HTMLInputElement}
 */
 const telefono = document.getElementById("telefono");

 /**
  * @type {HTMLSpanElement}
  */
 const validazioneTelefono = document.getElementById("validazione-telefono");

/************************** EVENT LISTENERS *****************************/

let valid = true;

// Check Nome
nome.addEventListener("input", () => {
    if (!validaNomeCognome(nome.value)) {
        setValidationMessage(validazioneNome, "Inserisci un nome valido (max 50 caratteri)");
        disableBtn(signupBtn);
        valid = false;
    } else {
        clearValidationMsg(validazioneNome);
        enableBtn(signupBtn);
        valid = true;
    }
});

// Check Cognome
cognome.addEventListener("input", () => {
    if (!validaNomeCognome(cognome.value)) {
        setValidationMessage(validazioneCognome, "Inserisci un cognome valido (max 50 caratteri)");
        disableBtn(signupBtn);
        valid = false;
    } else {
        clearValidationMsg(validazioneCognome);
        enableBtn(signupBtn);
        valid = true;
    }
});

// Check Email
email.addEventListener("input", () => {
    if (!validaEmail(email.value)) {
        setValidationMessage(signupEmailValidation, "Inserisci un'email valida");
        disableBtn(signupBtn);
        valid = false;
    } else {
        clearValidationMsg(validazioneEmail);
        enableBtn(signupBtn);
        valid = true;
    }
});

// Check Password
password.addEventListener("input", () => {
    if (!validaPassword(password.value)) {
        setValidationMessage(validazionePassword, "La password deve avere almeno 4 caratteri, contenere una minuscola, una maiuscola, un numero e un carattere speciale");
        disableBtn(signupBtn);
        valid = false;
    } else {
        clearValidationMsg(validazionePassword);
        enableBtn(signupBtn);
        valid = true;
    }
});

// Check Telefono
telefono.addEventListener("input", () => {
    if (!validaTelefono(telefono.value)) {
        setValidationMessage(validazioneTelefono, "Il numero di telefono deve essere di 10 numeri e può contenere il prefisso italiano (+39)");
        disableBtn(signupBtn);
        valid = false;
    } else {
        clearValidationMsg(validazioneTelefono);
        enableBtn(signupBtn);
        valid = true;
    }
});

signupBtn.addEventListener("click", (e) => {
    if (!valid) {
        e.preventDefault();
    }
});

/************************** VALIDATION *****************************/

/**
 * Valida il nome & cognome di un cliente
 * @param {string} text Il testo da controllare
 * @returns true Se il nome/cognome di un cliente è valido, false altrimenti
 */
function validaNomeCognome(text) {
    return /^[a-zA-Z]{1,50}$/.test(text);
}

/**
 * Valida indirizzo email
 * @link https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
 * @param {string} email Email da controllare
 * @returns true Se l'email è valida, false altrimenti
 */
function validaEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
}

/**
 * Valida password
 * @link https://www.ocpsoft.org/tutorials/regular-expressions/password-regular-expression/ 
 * @param {string} password Password da controllare
 * @returns true Se la password è valida, false altrimenti
 */
function validaPassword(password) {
    // return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?]).{4,}$/.test(password);
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{4,}$/.test(password);
}

/**
 * Valida telefono
 * @link https://forum.html.it/forum/showthread/t-1029132.html
 * @param {string} telefono Telefono da controllare
 * @returns true Se il telefono è valido, false altrimenti
 */
 function validaTelefono(telefono) {
    return /^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$/.test(telefono);
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
