"use strict";

var express = require('express');
const { body, validationResult } = require('express-validator');
var router = express.Router();
const logger = require('../util/logger');
const EntOrdine = require('../entities/entOrdine');
const orderStatus = require('../entities/enumeratives/statoOrderType');
const ordineDao = require('../dao/ordineDao');

/* GET Checkout page. */
router.get('/', function(req, res, next) {
  res.render('checkout', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'           // Orari
             ,'/javascripts/richiedimodals.js'           // Modals
             ,'/javascripts/validazioneCheckout.js'],    // Validazione pagamento ordine
    utente: req.user,
    title: "Checkout"
  });
});

// Aggiunta dell'ordine al DB
router.post('/', [
  body('metodoPagamento').isIn(['credit-card', 'debit-card']).withMessage('Metodo di pagamento non valido.'),
  body('nomeCompleto').isString().withMessage('Inserisci un nome completo valido (max 50 caratteri)'),
  body('numeroCarta').matches(/^[0-9]{16}$/).withMessage('Inserisci un numero di carta valido (16 cifre)'),
  body('scadenzaCarta').custom((date) => {
    const now = new Date();
    const mese = now.getMonth() + 1;
    const anno = now.getFullYear();

    const exDate = new Date(date);
    const exMese = exDate.getMonth() + 1;
    const exAnno = exDate.getFullYear();

    return /^\d{4}-\d{2}$/.test(date) && (exAnno > anno || (exAnno === anno && exMese >= mese));
  }).withMessage('Inserisci una scadenza valida (dal mese corrente in avanti)'),

  body('cvvCarta').matches(/^[0-9]{3}$/).escape().withMessage("Inserisci un CVV valido (3 cifre)"),

], async function (req, res, next) {

  const errors = validationResult(req);

  if (errors.isEmpty()) {

    let infoOrdine = req.body.piatto1;
 
    if (req.body.piatto2) {
      infoOrdine += `, ${req.body.piatto2}`;
    }
    if (req.body.piatto3) {
      infoOrdine += `, ${req.body.piatto3}`;
    }
    if (req.body.piatto4) {
      infoOrdine += `, ${req.body.piatto4}`;
    }
    if (req.body.piatto5) {
      infoOrdine += `, ${req.body.piatto5}`;
    }

    const email = req.user.email;
    const stato = orderStatus.INVIATO;

    const ordine = new EntOrdine(
      undefined,
      email,
      infoOrdine, 
      req.body.telefono,
      req.body.data, 
      req.body.ora,
      stato, 
      req.body.totale);

    ordineDao.addOrdine(ordine)
    .then(async (id) => {
      logger.logInfo(`Nuovo ordine aggiunto con il codice: ${id}`);

      const ordini = await ordineDao.findOrdiniByEmail(email);

      res.render('iMieiOrdini', {
        styles: ['/stylesheets/custom.css'],
        scripts: ['/javascripts/orario_negozio.js','/javascripts/richiedimodals.js'], 
        utente: req.user,
        ordini: ordini,
        title: "I Miei Ordini"
      });
    })
      
    } else {
        logger.logError(JSON.stringify(errors));

        res.render('checkout', {
          utente: req.user,
          carrello: carrello,
          utileOrdine: {
            telefono: req.body.telefono,
            data: req.body.dataOrdine,
            ora: req.body.oraOrdine
          },
          title: "Checkout",
          message:`Ordine trasmesso correttamente al checkout!`, 
          styles: ['/stylesheets/custom.css'],
          scripts: ['/javascripts/orario_negozio.js','/javascripts/richiedimodals.js','/javascripts/validazioneCheckout.js']
        });
      }
});


module.exports = router;