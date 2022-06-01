"use strict";

/************************** CONSTANTS *****************************/

/**
* @type {HTMLButtonElement}
*/
const aggiungiOrdineBtn = document.getElementById("btn-ordina-vaicheckout");

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
const dataOrdine = document.getElementById("dataOrdine");

/**
* @type {HTMLSpanElement}
*/
const validazioneDataOrdine = document.getElementById("validazione-dataOrdine");

/************************** INIZIALIZZAZIONE *****************************/

telefono.classList.add('non-valido');
dataOrdine.classList.add('non-valido');
disableBtn(aggiungiOrdineBtn);

/************************** EVENT LISTENERS *****************************/

let valid = true;
const formOrdinazione = document.getElementById("formOrdinazione");

// Check Telefono
telefono.addEventListener("input", () => {
    if (!validaTelefono(telefono.value)) {
        setValidationMessage(validazioneTelefono, "Il numero di telefono deve essere di 10 numeri e può contenere il prefisso italiano (+39)");
        disableBtn(aggiungiOrdineBtn);
        telefono.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneTelefono);
        telefono.classList.remove('non-valido');
        const nonValidi = formRegistrazione.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(aggiungiOrdineBtn);
            valid = true;
        }
    }
});

// Check Data Ordine
dataOrdine.addEventListener("input", () => {
    if (!validaDataOrdine(dataOrdine.value)) {
        setValidationMessage(validazioneDataOrdine, "La data di ritiro dell'ordine non può essere nel passato");
        disableBtn(aggiungiOrdineBtn);
        dataOrdine.classList.add('non-valido');
        valid = false;
    } else {
        clearValidationMsg(validazioneDataOrdine);
        dataOrdine.classList.remove('non-valido');
        const nonValidi = formRegistrazione.querySelectorAll('.non-valido');
        if(nonValidi.length === 0){
            enableBtn(aggiungiOrdineBtn);
            valid = true;
        }
    }
});

/************************** VALIDATION *****************************/

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
 * Valida data dell'ordine
 * @param {date} data Data da controllare
 * @returns true Se la data è valida, false altrimenti
 */
 function validaDataOrdine(data) {
    return;
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