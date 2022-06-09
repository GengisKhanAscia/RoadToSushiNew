"use strict";

/************************** CONSTANTS *****************************/

/**
 * @type {HTMLButtonElement}
 */
const signupBtn = document.getElementById("signup-btn-utente");

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
 
 /**
 * @type {HTMLInputElement}
 */
  const invalidCheck = document.getElementById("invalidCheck");

/**
* @type {HTMLSpanElement}
*/
const validazioneInvalidCheck = document.getElementById("validazione-invalidCheck");

/**
 * @type {HTMLInputElement}
 */
const imgPersonale = document.getElementById("imgPersonale");

/**
* @type {HTMLSpanElement}
*/
const validazioneImgPersonale = document.getElementById("validazione-imgPersonale");

/************************** INIZIALIZZAZIONE *****************************/

nome.classList.add('non-valido');
cognome.classList.add('non-valido');
email.classList.add('non-valido');
password.classList.add('non-valido');
telefono.classList.add('non-valido');
invalidCheck.classList.add('non-valido');
if(imgPersonale){
    imgPersonale.classList.add('non-valido');
}
disableBtn(signupBtn);
let valid = true;
const formRegistrazione = document.getElementById("formRegistrazione");

/************************** EVENT LISTENERS *****************************/

// Check Nome
nome.addEventListener("input", () => {
    if (!validaNomeCognome(nome.value)) {
        setValidationMessage(validazioneNome, "Inserisci un nome valido (max 50 caratteri)");
        disableBtn(signupBtn);
        nome.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneNome);
        nome.classList.remove('non-valido');
        // const nonValidi = formRegistrazione.getElementsByClassName("non-valido");
        const nonValidi = formRegistrazione.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(signupBtn);
            valid = true;
        }
    }
});

// Check Cognome
cognome.addEventListener("input", () => {
    if (!validaNomeCognome(cognome.value)) {
        setValidationMessage(validazioneCognome, "Inserisci un cognome valido (max 50 caratteri)");
        disableBtn(signupBtn);
        cognome.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneCognome);
        cognome.classList.remove('non-valido');
        const nonValidi = formRegistrazione.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(signupBtn);
            valid = true;
        }
    }
});

// Check Email
email.addEventListener("input", () => {
    if (!validaEmail(email.value)) {
        setValidationMessage(validazioneEmail, "Inserisci un'email valida");
        disableBtn(signupBtn);
        email.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneEmail);
        email.classList.remove('non-valido');
        const nonValidi = formRegistrazione.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(signupBtn);
            valid = true;
        }
    }
});

// Check Password
password.addEventListener("input", () => {
    if (!validaPassword(password.value)) {
        setValidationMessage(validazionePassword, "La password deve avere almeno 4 caratteri, contenere una minuscola, una maiuscola, un numero e un carattere speciale");
        disableBtn(signupBtn);
        password.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazionePassword);
        password.classList.remove('non-valido');
        const nonValidi = formRegistrazione.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(signupBtn);
            valid = true;
        }
    }
});

// Check Telefono
telefono.addEventListener("input", () => {
    if (!validaTelefono(telefono.value)) {
        setValidationMessage(validazioneTelefono, "Il numero di telefono deve essere di 10 numeri e può contenere il prefisso italiano (+39)");
        disableBtn(signupBtn);
        telefono.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneTelefono);
        telefono.classList.remove('non-valido');
        const nonValidi = formRegistrazione.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(signupBtn);
            valid = true;
        }
    }
});

// Check Checkbox
invalidCheck.addEventListener("input", () => {
    if (!validaCheckbox(invalidCheck)) {
        setValidationMessage(validazioneInvalidCheck, "Non hai spuntato la checkbox della privacy");
        disableBtn(signupBtn);
        invalidCheck.classList.add('non-valido');
        valid = false;
    }
    else{
        clearValidationMsg(validazioneInvalidCheck);
        invalidCheck.classList.remove('non-valido');
        const nonValidi = formRegistrazione.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(signupBtn);
            valid = true;
        }
    }
});

// Check Immagine del Personale
imgPersonale.addEventListener("input", () => {
    const filePath = imgPersonale.value;
    if(!validaFormatoImmagine(filePath)){
        setValidationMessage(validazioneImgPersonale, "Si accettano solo .jpg, .jpeg o .png!");
        disableBtn(signupBtn);
        imgPersonale.classList.add('non-valido');
        valid = false;
    }
    else{
        clearValidationMsg(validazioneImgPersonale);
        imgPersonale.classList.remove('non-valido');
        const nonValidi = formRegistrazione.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(signupBtn);
            valid = true;
        }
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
    return /^[a-zA-Z ]{1,50}$/.test(text);
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
 * @param {number} telefono Telefono da controllare
 * @returns true Se il telefono è valido, false altrimenti
 */
 function validaTelefono(telefono) {
    return /^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{7}$/.test(telefono);
}  

/**
 * Valida la checkbox
 * @param {checkbox} check La checkbox da controllare
 * @returns true Se la checkbox è spuntata (on), false (undefined) altrimenti
 */
 function validaCheckbox(check) {
    // if(check !== 'on'){
    // if(check === 'undefined'){
    if(check.checked){
        return true;
    }
    else{
        return false;
    }
}

/**
 * Valida l'Immagine del Personale
 * @param {blob} img L'immagine da controllare
 * @returns true Se l'immagine soddisfa i requisiti, false altrimenti
 */
function validaFormatoImmagine(img){
    const validaEstensioni = /(\.png|\.jpeg|\.jpg)$/i;       
    if (!validaEstensioni.exec(img)) {
        alert('ERRORE: accettiamo solo .jpg, .jpeg o .png!');
        imgPersonale.value = '';
        return false;
    }
    else{
        return true;
    } 
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