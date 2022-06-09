"use strict";

/************************** CONSTANTS *****************************/

// const numeroPiatti = document.getElementById("numeroPiatti");

// const formEsternoJs = document.getElementById("formjs");

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
let valid = true;
const formOrdinazione = document.getElementById("formOrdinazione");
const today = new Date();

/************************** EVENT LISTENERS *****************************/

/*
generaFormPiatti();

// Check Numero Piatti
numeroPiatti.addEventListener("input", () => {
    generaFormPiatti();
});
*/

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
        const nonValidi = formOrdinazione.querySelectorAll('.non-valido');
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
        const nonValidi = formOrdinazione.querySelectorAll('.non-valido');
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
 * @link https://stackoverflow.com/questions/11344324/validate-if-date-is-before-date-of-current-date 
 * @param {date} data Data da controllare
 * @returns true Se la data è valida, false altrimenti [almeno il giorno stesso, non nel passato]
 */
 function validaDataOrdine(data) {
    return ((new Date(data) > today) || (new Date(data).getFullYear() >= today.getFullYear() && new Date(data).getMonth() >= today.getMonth() && new Date(data).getDate() >= today.getDate()));
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

/************************** EXTRA-FUNCTION *****************************/

/**
 * Genera il numero di form per l'inserimento del piatto
 */
/*
function generaFormPiatti() {
    // Rimuovo i form con classe 'div-paittiejs'
    const divPiatti = document.getElementsByClassName('div-piattijs');
    while (divPiatti.length > 0) {
        divPiatti[0].parentNode.removeChild(divPiatti[0]); // Continua a rimuovere partendo dal primo in alto
    }

    // creo e aggiungo tanti div-campi quanti ne richiede l'utente
    const inputNumeroPiatti = parseInt(numeroPiatti.value);
    for (let i = 1; i <= inputNumeroPiatti; i++) {
        const div = document.createElement('div');
        div.className = 'form-group mb-3 div-piattijs';
        div.innerHTML = `<select class="form-select"
                        name="lista-piatti"
                        id="lista-piatti"
                        required>
                        <option value="" disabled selected>Seleziona il piatto ${i}</option>
                        
                        <% if (typeof piatti !== "undefined") { %> 
                            <% if(piatti.length > 0) { %>
                                <% piatti.forEach((piatto) => { %>
                                    <option value="<%= piatto.nome %>"><%= piatto.nome + " " + piatto.prezzo %> €</option> 
                                <% }); %>
                            <% } %>
                        <% } %>

                        </select>`;
        formEsternoJs.appendChild(div);
    }
}
*/