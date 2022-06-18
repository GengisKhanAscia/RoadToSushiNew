"use strict";

var express = require('express');
var router = express.Router();
const logger = require('../util/logger');
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

// Delete dell'ordine nel DB
router.post('/:idOrdine', async function (req, res, next) {

  const idOrdine = req.params.idOrdine;
  const email = req.user.email;

  await ordineDao.deleteOrdine(idOrdine)
  .then(async (id) => {
    logger.logInfo(`Eliminato ordine con l'id: ${id}`);

    const ordini = await ordineDao.findOrdiniByEmail(email);

    res.render('iMieiOrdini', {
      styles: ['/stylesheets/custom.css'],
      scripts: ['/javascripts/orario_negozio.js','/javascripts/richiedimodals.js'], 
      utente: req.user,
      ordini: ordini,
      message:`L'ordine con id ${id} è stato annullato. Presto riceverai un rimborso!`
    });

  })
  .catch(async function (err) {
    const ordini = await ordineDao.findOrdiniByEmail(email);

    logger.logError(JSON.stringify(err));

    res.render('iMieiOrdini', {
      styles: ['/stylesheets/custom.css'],
      scripts: ['/javascripts/orario_negozio.js','/javascripts/richiedimodals.js'], 
      utente: req.user,
      ordini: ordini,
      errors: err
    })
  });

});

module.exports = router;