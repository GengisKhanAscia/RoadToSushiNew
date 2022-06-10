"use strict";

var express = require('express');
const { body, validationResult } = require('express-validator');
var router = express.Router();
const logger = require('../util/logger');
const piattoDao = require('../dao/piattoDao');
const EntOrdine = require('../entities/entOrdine');

/* GET Ordina page. */
router.get('/', async function(req, res, next) {
  const piatti = await piattoDao.findAllPiatti();
  console.log(piatti);
  res.render('ordina', {
    piatti: piatti,
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'       // Orari
             ,'/javascripts/richiedimodals.js'       // Modals
             ,'/javascripts/validazioneOrdine.js'],  // Validazione nuovo ordine
    utente: req.user
  });
});

// Aggiunta dell'ordine
router.post('/', [
  
  body("piatto1").trim().escape().withMessage("Inserisci un piatto valido")
  .custom(async function (piatto1) {
    if(piatto1 === "undefined" || piatto1 === null || piatto1 === "") { 
        logger.logDebug(`Devi inserire almeno un piatto! Non va bene ${piatto1}`);
        throw new Error("Hai inserito un piatto che non va bene");
    }
  }),

  body("piatto2").trim().escape().withMessage("Inserisci un piatto opzionale valido")
  .custom(async function (piatto2) {
    if(piatto2 === null || piatto2 === "") { 
        logger.logDebug(`Seleziona correttamente un piatto, altrimenti non selezionarlo. Non va bene ${piatto2}`);
        throw new Error("Hai inserito un piatto opzionale che non va bene");
    }
  }),

  body("piatto3").trim().escape().withMessage("Inserisci un piatto opzionale valido")
  .custom(async function (piatto3) {
    if(piatto3 === null || piatto3 === "") { 
        logger.logDebug(`Seleziona correttamente un piatto, altrimenti non selezionarlo. Non va bene ${piatto3}`);
        throw new Error("Hai inserito un piatto opzionale che non va bene");
    }
  }),

  body("piatto4").trim().escape().withMessage("Inserisci un piatto opzionale valido")
  .custom(async function (piatto4) {
    if(piatto4 === null || piatto4 === "") { 
        logger.logDebug(`Seleziona correttamente un piatto, altrimenti non selezionarlo. Non va bene ${piatto4}`);
        throw new Error("Hai inserito un piatto opzionale che non va bene");
    }
  }),

  body("piatto5").trim().escape().withMessage("Inserisci un piatto opzionale valido")
  .custom(async function (piatto5) {
    if(piatto5 === null || piatto5 === "") { 
        logger.logDebug(`Seleziona correttamente un piatto, altrimenti non selezionarlo. Non va bene ${piatto5}`);
        throw new Error("Hai inserito un piatto opzionale che non va bene");
    }
  }),
  
  body("telefono").trim().matches(/^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{7}$/).escape().withMessage("Il numero di telefono deve essere di 10 numeri e può contenere il prefisso italiano (+39)"),
  body("dataOrdine")
  .custom(async function (dataOrdine) {
    const today = new Date();
    if(!((new Date(dataOrdine) > today) || (new Date(dataOrdine).getFullYear() >= today.getFullYear() && new Date(dataOrdine).getMonth() >= today.getMonth() && new Date(dataOrdine).getDate() >= today.getDate()))){
      throw new Error("La data di ritiro dell'ordine non può essere nel passato");
    }
  }),

  body("oraOrdine")
  .custom(async function (oraOrdine) {
    if(oraOrdine <= "12:00" || oraOrdine >= "22:00"){
      throw new Error("Devi fornire un orario valido, compreso tra le 12:00 e le 22:00.");
    }
  }),
  
  ], async function(req, res, next) {

  
  console.log(req.body.piatto1);
  console.log(req.body.piatto2);
  console.log(req.body.piatto3);
  console.log(req.body.piatto4);
  console.log(req.body.piatto5);
  console.log(req.body.email);
  console.log(req.body.telefono);
  console.log(req.body.dataOrdine);
  console.log(req.body.oraOrdine);
  

  const errors = validationResult(req);

  if (errors.isEmpty()) {

    res.render('checkout', {
      utente: req.user,
      title: "Checkout",
      message:`Ordine realizzato da ${ordine.email} !`, 
      styles: ['/stylesheets/custom.css'],
      scripts: ['/javascripts/orario_negozio.js','/javascripts/richiedimodals.js','/javascripts/validazioneCheckout.js']
    });
  } else {
    logger.logError(JSON.stringify(errors));

    res.render("ordina", {
        utente: req.user,
        title: "Ordina",
        errors: errors.array(),
        styles: ['/stylesheets/custom.css'],
        scripts: ['/javascripts/orario_negozio.js', '/javascripts/richiedimodals.js', '/javascripts/validazioneOrdine.js']
    });
  }
});

module.exports = router;
