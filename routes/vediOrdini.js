"use strict";

var express = require('express');
var router = express.Router();

/* GET Vedi Ordini page. */
router.get('/', function(req, res, next) {
  res.render('vediOrdini', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'     // Orari
             ,'/javascripts/richiedimodals.js'],   // Modals
    utente: req.user
  });
});

module.exports = router;
