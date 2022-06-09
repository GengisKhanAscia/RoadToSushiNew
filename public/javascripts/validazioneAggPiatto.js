"use strict";

/************************** CONSTANTS *****************************/

/**
 * @type {HTMLButtonElement}
 */
 const aggiungiPiattoBtn = document.getElementById("signup-btn-aggiungipiatto");

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
 const prezzo = document.getElementById("prezzo");
 
 /**
  * @type {HTMLSpanElement}
  */
 const validazionePrezzo = document.getElementById("validazione-prezzo");
 
 /**
  * @type {HTMLInputElement}
  */
 const ingredienti = document.getElementById("ingredienti");
 
 /**
  * @type {HTMLSpanElement}
  */
 const validazioneIngredienti = document.getElementById("validazione-ingredienti");

 /**
  * @type {HTMLInputElement}
  */
 const imgPiatto = document.getElementById("imgPiatto");
 
 /**
 * @type {HTMLSpanElement}
 */
 const validazioneImgPiatto = document.getElementById("validazione-imgPiatto");

 /************************** INIZIALIZZAZIONE *****************************/

nome.classList.add('non-valido');
prezzo.classList.add('non-valido');
ingredienti.classList.add('non-valido');
imgPiatto.classList.add('non-valido');
disableBtn(aggiungiPiattoBtn);
let valid = true;
const formAggPiatto = document.getElementById("formAggPiatto");

/************************** EVENT LISTENERS *****************************/

// Check Nome
nome.addEventListener("input", () => {
  if (!validaNome(nome.value)) {
      setValidationMessage(validazioneNome, "Inserisci un nome valido (max 50 caratteri)");
      disableBtn(aggiungiPiattoBtn);
      nome.classList.add('non-valido');
      valid = false;
  } else {
      clearValidationMsg(validazioneNome);
      nome.classList.remove('non-valido');
      const nonValidi = formAggPiatto.querySelectorAll('.non-valido');
      if(nonValidi.length === 0){
          enableBtn(aggiungiPiattoBtn);
          valid = true;
      }
  }
});

// Check Prezzo
prezzo.addEventListener("input", () => {
  if (!validaPrezzo(prezzo.value)) {
      setValidationMessage(validazionePrezzo, "Il prezzo deve essere di almeno 1€ e puoi aumentarlo di 0.50€ alla volta");
      disableBtn(aggiungiPiattoBtn);
      prezzo.classList.add('non-valido');
      valid = false;
  } else {
      clearValidationMsg(validazionePrezzo);
      prezzo.classList.remove('non-valido');
      const nonValidi = formAggPiatto.querySelectorAll('.non-valido');
      if(nonValidi.length === 0){
          enableBtn(aggiungiPiattoBtn);
          valid = true;
      }
  }
});

// Check Ingredienti
ingredienti.addEventListener("input", () => {
  if (!validaIngredienti(ingredienti.value)) {
      setValidationMessage(validazioneIngredienti, "La lista degli ingredienti non deve superare i 280 caratteri");
      disableBtn(aggiungiPiattoBtn);
      ingredienti.classList.add('non-valido');
      valid = false;
  } else {
      clearValidationMsg(validazioneIngredienti);
      ingredienti.classList.remove('non-valido');
      const nonValidi = formAggPiatto.querySelectorAll('.non-valido');
      if(nonValidi.length === 0){
          enableBtn(aggiungiPiattoBtn);
          valid = true;
      }
  }
});

// Check Immagine del Piatto
imgPiatto.addEventListener("input", () => {
  const filePath = imgPiatto.value;
  if(!validaFormatoImmagine(filePath)){
      setValidationMessage(validazioneImgPiatto, "Si accettano solo .jpg, .jpeg o .png!");
      disableBtn(aggiungiPiattoBtn);
      imgPiatto.classList.add('non-valido');
      valid = false;
  }
  else{
      clearValidationMsg(validazioneImgPiatto);
      imgPiatto.classList.remove('non-valido');
      const nonValidi = formAggPiatto.querySelectorAll('.non-valido');
      if(nonValidi.length === 0){
          enableBtn(aggiungiPiattoBtn);
          valid = true;
      }
  }
});

aggiungiPiattoBtn.addEventListener("click", (e) => {
  if (!valid) {
      e.preventDefault();
  }
});

/************************** VALIDATION *****************************/

/**
 * Valida il nome di un piatto
 * @param {string} text Il testo da controllare
 * @returns true Se il nome di un piatto è valido, false altrimenti
 */
 function validaNome(text) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,50}$/.test(text);
}

/**
 * Valida il prezzo di un piatto
 * @link https://stackoverflow.com/questions/34057595/allow-2-decimal-places-in-input-type-number
 * @param {number} prezzo Prezzo da controllare
 * @returns true Se il prezzo è valido, false altrimenti
 */
 function validaPrezzo(prezzo) {
  return /^\d*(\.\d{0,2})?$/.test(prezzo);
}  

/**
 * Valida la lista degli Ingredienti di un piatto
 * @param {string} text Il testo da controllare
 * @returns true Se la lista degli ingredienti è valida, false altrimenti
 */
 function validaIngredienti(text) {
  return /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ_.,()&| ]{1,280}$/.test(text);
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
      imgPiatto.value = '';
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
