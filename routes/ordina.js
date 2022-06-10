"use strict";

var express = require('express');
const { body } = require('express-validator');
var router = express.Router();
const logger = require('../util/logger');
const piattoDao = require('../dao/piattoDao');

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

router.post('/', [
  /*
  body("piatto1").trim().escape().withMessage("Inserisci un piatto valido"),
  body("piatto").trim().escape().withMessage("Inserisci un piatto valido"),
  */
  body("telefono").trim().matches(/^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{7}$/).escape().withMessage("Il numero di telefono deve essere di 10 numeri e può contenere il prefisso italiano (+39)"),
  body("dataOrdine")
  .custom(async function (dataOrdine) {
    const today = new Date();
    if(!((new Date(dataOrdine) > today) || (new Date(dataOrdine).getFullYear() >= today.getFullYear() && new Date(dataOrdine).getMonth() >= today.getMonth() && new Date(dataOrdine).getDate() >= today.getDate()))){
      throw new Error("La data di ritiro dell'ordine non può essere nel passato");
    }
  })
  
  ], async function(req, res, next) {

  /*
  console.log(req.body.piatto1);
  console.log(req.body.piatto2);
  console.log(req.body.piatto3);
  console.log(req.body.piatto4);
  console.log(req.body.piatto5);
  console.log(req.body.email);
  console.log(req.body.telefono);
  console.log(req.body.dataOrdine);
  console.log(req.body.oraOrdine);
  */

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const ordine = new EntOrdine(
        req.body.nome,
        req.body.prezzo,
        req.body.ingredienti,
        req.file.buffer
    );

    // Aggiungo Ordine
    let ordineId = await ordineDao.addOrdine(ordine);
    logger.logInfo(`Nuovo Ordine aggiunto con l'id: ${ordineId}`);

    res.render('checkout', {
      utente: req.user,
      title: "Checkout",
      message:`Ordine emesso da ${ordine.email} aggiunto correttamente!`, 
      styles: ['/stylesheets/custom.css'],
      scripts: ['/javascripts/orario_negozio.js'         // Orari
               ,'/javascripts/richiedimodals.js'         // Modals
               ,'/javascripts/validazioneCheckout.js'],  // Validazione checkout
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
