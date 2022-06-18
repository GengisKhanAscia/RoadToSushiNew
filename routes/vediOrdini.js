"use strict";

var express = require('express');
var router = express.Router();
const logger = require('../util/logger');
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

// Update dell'ordine nel DB
router.post('/:idOrdine', async function (req, res, next) {

  const idOrdine = req.params.idOrdine;

  await ordineDao.updateOrdine(idOrdine)
  .then(async (id) => {
    logger.logInfo(`Ordine aggiornato con l'id: ${id}`);

    const ordini = await ordineDao.findAllOrdini();

    res.render('vediOrdini', {
      styles: ['/stylesheets/custom.css'],
      scripts: ['/javascripts/orario_negozio.js','/javascripts/richiedimodals.js'], 
      utente: req.user,
      ordini: ordini,
      message:`L'ordine con id ${id} è pronto!`
    });

  })
  .catch(async function (err) {
    const ordini = await ordineDao.findAllOrdini();

    logger.logError(JSON.stringify(err));

    res.render('vediOrdini', {
      styles: ['/stylesheets/custom.css'],
      scripts: ['/javascripts/orario_negozio.js','/javascripts/richiedimodals.js'], 
      utente: req.user,
      ordini: ordini,
      errors: err
    })
  });

});

module.exports = router;