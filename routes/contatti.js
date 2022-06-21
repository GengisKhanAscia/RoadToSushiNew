"use strict";

var express = require('express');
var router = express.Router();

/* GET Contatti page. */
router.get('/', function(req, res, next) {
  res.render('contatti', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'     // Orari
             ,'/javascripts/richiedimodals.js'],   // Modals
    utente: req.user,
    title: "Contatti"  
  });
});

module.exports = router;