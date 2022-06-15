"use strict";

var express = require('express');
var router = express.Router();
const ordineDao = require('../dao/ordineDao');

/* GET I Miei Ordini page. */
router.get('/', async function(req, res, next) {

  const ordini = await ordineDao.findOrdiniByEmail(req.user.email);

  res.render('iMieiOrdini', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'     // Orari
             ,'/javascripts/richiedimodals.js'],   // Modals
    utente: req.user,
    ordini: ordini
  });
});

module.exports = router;