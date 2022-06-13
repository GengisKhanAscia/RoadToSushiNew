"use strict";

var express = require('express');
const { body, validationResult } = require('express-validator');
const EntOrdine = require('../entities/entOrdine');
var router = express.Router();
const logger = require('../util/logger');

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
    

    //ti prendi gli altri hidden che devi aggiungere nell'ejs (con i nomi che vuoi tu)

    const ordine = EntOrdine(req.user.email,
      infoOrdine, req.body.telefono,
      req.body.data, req.body.ora,
      stato.INVIATO, req.body.totale);
   
    


    res.render('checkout', {
      styles: ['/stylesheets/custom.css'],
      scripts: ['/javascripts/orario_negozio.js'        
               ,'/javascripts/richiedimodals.js'       
               ,'/javascripts/validazioneCheckout.js'], 
      utente: req.user,
      ordine: ordine
    });
      
  } else {
      logger.logError(JSON.stringify(errors));

      res.render('checkout', {
          user: req.user,
          errors: errors.array(),
          cart: req.session.cart,
          styles: ['/stylesheets/checkout.css'],
          scripts: ['/javascripts/checkout.js']
      });
  }
});


module.exports = router;