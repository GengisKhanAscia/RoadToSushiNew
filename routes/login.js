"use strict";

const express = require('express');
const router = express.Router();
const passport = require('passport');
const logger = require('../util/logger');

/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'            // Orari
             ,'/javascripts/richiedimodals.js'            // Modals
             ,'/javascripts/validazioneLogin.js']         // Validazione form login
  });
});

// POST di un login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
      if (err) {
        logger.logError(err);
        return next(err);
      }
      if (!user) {
        logger.logError(info.message);
        return res.render("login", { 
              errors: info.message,       // Che cosa stampa? Invalid email/pwd di app.js?
              styles: ['/stylesheets/custom.css'],
              scripts: ['/javascripts/login.js']
          });
      }

      // SUCCESS
      req.login(user, async (err) => {
          if (err) {
            logger.logError(err);
            return next(err);
          }

          res.render("home", {
              utente: user,
              message:`${user.email} ti sei loggato con successo!`, 
              styles: ['/stylesheets/custom.css'],
              scripts: ['/javascripts/richiedimodals.js', '/javascripts/orario_negozio.js']
          });

          logger.logInfo("Utente loggato con successo!");
      });
  })(req, res, next);
});

module.exports = router;