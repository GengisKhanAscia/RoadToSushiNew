"use strict";

var express = require('express');
var router = express.Router();
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

module.exports = router;
