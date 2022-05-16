"use strict";

/************************** CONSTANTS *****************************/

/**
 * @type {HTMLButtonElement}
 */
 const accediBtn = document.getElementById("accedi_btn");

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

 /************************** INIZIALIZZAZIONE *****************************/

email.classList.add('non-valido');
password.classList.add('non-valido');
disableBtn(accediBtn);

/************************** EVENT LISTENERS *****************************/

let valid = true;
const formLogin = document.getElementById("formLogin");

// Check Email
email.addEventListener("input", () => {
    if (!validaEmail(email.value)) {
        setValidationMessage(validazioneEmail, "Inserisci un'email valida");
        disableBtn(accediBtn);
        email.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneEmail);
        email.classList.remove('non-valido');
        const nonValidi = formLogin.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(accediBtn);
            valid = true;
        }
    }
});

// Check Password
password.addEventListener("input", () => {
    if (!validaPassword(password.value)) {
        setValidationMessage(validazionePassword, "La password deve avere almeno 4 caratteri, contenere una minuscola, una maiuscola, un numero e un carattere speciale");
        disableBtn(accediBtn);
        password.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazionePassword);
        password.classList.remove('non-valido');
        const nonValidi = formLogin.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(accediBtn);
            valid = true;
        }
    }
});

accediBtn.addEventListener("click", (e) => {
    if (!valid) {
        e.preventDefault();
    }
});

/************************** VALIDATION *****************************/

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