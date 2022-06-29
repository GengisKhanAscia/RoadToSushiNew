"use strict";

const express = require('express');
const router = express.Router();
const passport = require('passport');
const logger = require('../util/logger');

/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'             // Orari
             ,'/javascripts/richiedimodals.js'             // Modals
             ,'/javascripts/validazioneLogin.js'],         // Validazione form login
    title: "Login"
  });
});

// POST di un login
router.post("/", (req, res, next) => {  
  // console.log("Stampo email pre-autenticazione: " + req.body.email);
  // console.log("Stampo password pre-autenticazione: " + req.body.password);
  passport.authenticate("local", (err, user, info) => {
      if (err) {
        logger.logError(err);
        return next(err);
      }
      if (!user) {
        logger.logError(info.message);
        return res.render("login", { 
              errors: info.message,      
              styles: ['/stylesheets/custom.css'],
              scripts: ['/javascripts/richiedimodals.js', '/javascripts/orario_negozio.js', '/javascripts/validazioneLogin.js'],
              title: "Login"
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
              scripts: ['/javascripts/richiedimodals.js', '/javascripts/orario_negozio.js'],
              title: "Home"
          });

          logger.logInfo("Utente loggato con successo!");
      });
  })(req, res, next);
});

module.exports = router;