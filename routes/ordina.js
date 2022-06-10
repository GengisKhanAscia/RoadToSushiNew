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

  body("piatto1") // NOT WORK .trim().escape().withMessage("Inserisci un piatto opzionale valido")
  .custom(async function (piatto1) {
    if(piatto1 === undefined || piatto1 === null || piatto1 === "") { 
        logger.logDebug(`Devi inserire almeno un piatto! Non va bene ${piatto1}`);
        throw new Error("Hai inserito un piatto che non va bene");
    }
  }),

  body("piatto2")
  .custom(async function (piatto2) {
    if(piatto2 === null || piatto2 === "") { 
        logger.logDebug(`Seleziona correttamente un piatto, altrimenti non selezionarlo. Non va bene ${piatto2}`);
        throw new Error("Hai inserito un piatto opzionale che non va bene");
    }
  }),

  body("piatto3")
  .custom(async function (piatto3) {
    if(piatto3 === null || piatto3 === "") { 
        logger.logDebug(`Seleziona correttamente un piatto, altrimenti non selezionarlo. Non va bene ${piatto3}`);
        throw new Error("Hai inserito un piatto opzionale che non va bene");
    }
  }),

  body("piatto4")
  .custom(async function (piatto4) {
    if(piatto4 === null || piatto4 === "") { 
        logger.logDebug(`Seleziona correttamente un piatto, altrimenti non selezionarlo. Non va bene ${piatto4}`);
        throw new Error("Hai inserito un piatto opzionale che non va bene");
    }
  }),

  body("piatto5")
  .custom(async function (piatto5) {
    if(piatto5 === null || piatto5 === "") { 
        logger.logDebug(`Seleziona correttamente un piatto, altrimenti non selezionarlo. Non va bene ${piatto5}`);
        throw new Error("Hai inserito un piatto opzionale che non va bene");
    }
  }),
  
  body("telefono").trim().matches(/^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{7}$/).escape().withMessage("Il numero di telefono deve essere di 10 numeri e può contenere il prefisso italiano (+39)"),
  body("dataOrdine")  // yyyy-dd-mm
  .custom(async function (dataOrdine) {
    const today = new Date();
    if(!((new Date(dataOrdine) > today) || (new Date(dataOrdine).getFullYear() >= today.getFullYear() && new Date(dataOrdine).getMonth() >= today.getMonth() && new Date(dataOrdine).getDate() >= today.getDate()))){
      throw new Error("La data di ritiro dell'ordine non può essere nel passato");
    }
  }),

  body("oraOrdine").trim().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).escape().withMessage("L'ora deve essere di formato HH:mm")  
  .custom(async function (oraOrdine) {
    if(oraOrdine <= "12:00" || oraOrdine >= "22:00"){
      logger.logDebug(`Orario che NON va bene`);
      throw new Error("Devi fornire un orario valido, compreso tra le 12:00 e le 22:00.");
    }
    else{
      logger.logDebug(`Orario che va bene`);
    }
  }),
  
  ], async function(req, res, next) {
  
  const errors = validationResult(req);

  if (errors.isEmpty()) {

    const p1 = await piattoDao.findPiattoByNome(req.body.piatto1);
    const p2 = req.body.piatto2 !== undefined ? await piattoDao.findPiattoByNome(req.body.piatto2) : undefined;
    const p3 = req.body.piatto3 !== undefined ? await piattoDao.findPiattoByNome(req.body.piatto3) : undefined;
    const p4 = req.body.piatto4 !== undefined ? await piattoDao.findPiattoByNome(req.body.piatto4) : undefined;
    const p5 = req.body.piatto5 !== undefined ? await piattoDao.findPiattoByNome(req.body.piatto5) : undefined;

    let totale = 0;
    const piatti_appo = [p1, p2, p3, p4, p5];
    let piatti = [];

    for (let i = 0; i < piatti_appo.length; i++) {
      if(piatti_appo[i] !== undefined) {
        piatti.push(piatti_appo[i]);
        totale += piatti_appo[i].prezzo;
      }
    }

    const carrello = {
      piatti: piatti,
      totale: totale
    };

    console.log(piatti);
    console.log(carrello);
    console.log(carrello.totale);

    res.render('checkout', {
      utente: req.user,
      title: "Checkout",
      message:`Ordine trasmesso correttamente al checkout!`, 
      carrello: carrello,
      styles: ['/stylesheets/custom.css'],
      scripts: ['/javascripts/orario_negozio.js','/javascripts/richiedimodals.js','/javascripts/validazioneCheckout.js']
    });
  } else {
    logger.logError(JSON.stringify(errors));

    const piatti = await piattoDao.findAllPiatti();

    res.render("ordina", {
      piatti: piatti,
      utente: req.user,
      title: "Ordina",
      errors: errors.array(),
      styles: ['/stylesheets/custom.css'],
      scripts: ['/javascripts/orario_negozio.js', '/javascripts/richiedimodals.js', '/javascripts/validazioneOrdine.js']
    });
  }
});

module.exports = router;
