"use strict";

const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const logger = require('../util/logger');
const piattoDao = require('../dao/piattoDao');
const EntPiatto = require('../entities/entPiatto');

const upload = multer({
  storage: multer.memoryStorage() /* ,
  limits: {
    fileSize: 5 * 1024 * 1024
  } */
});

/* GET Aggiungi Piatto page. */
router.get('/', function(req, res, next) {
  res.render('aggPiatto', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'          // Orari
             ,'/javascripts/richiedimodals.js'          // Modals
             ,'/javascripts/validazioneAggPiatto.js'],  // Validazione aggiunta piatto
    utente: req.user,
    title: "Aggiungi Piatto"
  });
});

// POST Aggiungi Piatto
router.post("/", upload.single('imgPiatto'), [
  body("nome").trim().matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,50}$/).escape().withMessage("Inserisci un nome valido")
    .custom(async function (nome) {
      const piatto = await piattoDao.findPiattoByNome(nome);

      if(!piatto.hasOwnProperty("error")) { // Se findPiattoByNome trova un piatto e non l'errore "Piatto non trovato"
          logger.logDebug(`Esiste già un piatto con il nome ${nome}`);
          throw new Error("Il piatto inserito è già esistente.");
      }
    }),
  body("prezzo").trim().matches(/^\d*(\.\d{0,2})?$/).escape().withMessage("Il prezzo deve essere di almeno 1€ e puoi aumentarlo di 0.50€ alla volta"),
  body("ingredienti").trim().matches(/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ_.,()&| ]{1,280}$/).escape().withMessage("La lista degli ingredienti non deve superare i 280 caratteri"),
    
], async function (req, res) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {

    const piatto = new EntPiatto(
        req.body.nome,
        req.body.prezzo,
        req.body.ingredienti,
        req.file.buffer
    );

    // Aggiungo Piatto
    let piattoId = await piattoDao.addPiatto(piatto);
    logger.logInfo(`Nuovo piatto aggiunto con il nome: ${piattoId}`);

    res.render("piatti", {
        utente: req.user,
        title: "Piatti",
        message:`${piatto.nome} aggiunto correttamente!`, 
        styles: ['/stylesheets/custom.css'],
        scripts: ['/javascripts/orario_negozio.js', '/javascripts/richiedimodals.js']
    });
  } else {
    logger.logError(JSON.stringify(errors));

    res.render("aggPiatto", {
        utente: req.user,
        title: "Aggiungi Piatto",
        errors: errors.array(),
        styles: ['/stylesheets/custom.css'],
        scripts: ['/javascripts/orario_negozio.js', '/javascripts/richiedimodals.js', '/javascripts/validazioneAggPiatto.js']
    });
  }
});

module.exports = router;