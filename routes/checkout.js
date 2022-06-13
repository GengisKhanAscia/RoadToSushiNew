"use strict";

var express = require('express');
const { body, validationResult } = require('express-validator');
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
  body('numeroCarta').isCreditCard().withMessage('Inserisci un numero di carta valido (16 cifre)'),
  body('scadenzaCarta').custom((date) => {
    const now = new Date();
    const mese = now.getMonth() + 1;
    const anno = now.getFullYear();

    const exDate = new Date(date);
    const exMese = exDate.getMonth() + 1;
    const exAnno = exDate.getFullYear();

    return /^\d{4}-\d{2}$/.test(date) && (exAnno > anno || (exAnno === anno && exMese >= mese));
  }).withMessage('Inserisci una scadenza valida (dal mese corrente in avanti)'),

  body('cvv').isInt().matches(/^[0-9]{3}$/).escape().withMessage("Inserisci un CVV valido (3 cifre)"),

], async function (req, res, next) {

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    
      const customerId = parseInt(req.body.userId);

      /**
       * @type {Cart}
       */
      let cart = req.session.cart;

      if (cart !== undefined) {
          const order = new Order(
              undefined,
              customerId,
              new Date().toDateString(),
              parseFloat(cart.price.toFixed(2)),
              orderType.BUY);

          orderDao.addOrder(order, cart.items)
              .then(async (id) => {
                  logger.logInfo(`Added order with id: ${id}`);

                  const orders = await orderDao.findOrdersByCustomerId(customerId);

                  res.render('customer-orders', {
                      user: req.user,
                      message: "Order added successfully",
                      orders: orders,
                      styles: ['/stylesheets/orders.css']
                  });

              }).catch((err) => {
                  logger.logError(err);

                  res.render('checkout', {
                      user: req.user,
                      errors: [err],
                      cart: cart,
                      styles: ['/stylesheets/checkout.css'],
                      scripts: ['/javascripts/checkout.js'],
                  });
              });
      }
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
