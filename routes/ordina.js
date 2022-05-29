"use strict";

var express = require('express');
var router = express.Router();

/* GET Ordina page. */
router.get('/', function(req, res, next) {
  res.render('ordina', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'     // Orari
             ,'/javascripts/richiedimodals.js'],   // Modals
    utente: req.user
  });
});

module.exports = router;
