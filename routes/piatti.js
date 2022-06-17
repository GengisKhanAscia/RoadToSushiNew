"use strict";

var express = require('express');
var router = express.Router();
const piattoDao = require('../dao/piattoDao');

/* GET Piatti page. */
router.get('/', async function(req, res, next) {
  const piatti = await piattoDao.findAllPiatti();
  console.log(piatti);
  res.render('piatti', {
    piatti: piatti,
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'     // Orari
             ,'/javascripts/richiedimodals.js'     // Modals
             ,'/javascripts/validazioneRicerca.js'],  
    utente: req.user
  });
});

module.exports = router;
