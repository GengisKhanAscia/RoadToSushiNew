"use strict";

var express = require('express');
var router = express.Router();
const ordineDao = require('../dao/ordineDao');

/* GET Vedi Ordini page. */
router.get('/', async function(req, res, next) {

  const ordini = await ordineDao.findAllOrdini();

  res.render('vediOrdini', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'     // Orari
             ,'/javascripts/richiedimodals.js'],   // Modals
    utente: req.user,
    ordini: ordini
  });
});

module.exports = router;