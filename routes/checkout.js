"use strict";

var express = require('express');
var router = express.Router();

/* GET Checkout page. */
router.get('/', function(req, res, next) {
  res.render('checkout', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'           // Orari
             ,'/javascripts/richiedimodals.js'           // Modals
             ,'/javascripts/validazioneCheckout.js'],    // Validazione pagamento ordine
    utente: req.user
  });
});

module.exports = router;
