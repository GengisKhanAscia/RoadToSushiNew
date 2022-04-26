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
             ,'/javascripts/validazioneRegistrazione.js'] // Validazione form registrazione (serve?)
  });
});

/* POST di un login cliente */ 
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
      if (err) {
          console.error("ERRORE: " + err);
          return next(err);
      }
      if (!user) {
        console.error("ERRORE: " + info.message);
        return res.render("login", {  // QUI COSA METTO?
              errors: info.message,
              styles: ['/stylesheets/custom.css']
          });
      }

      // SUCCESS
      req.login(user, async (err) => {
          if (err) {
            console.error("ERRORE: " + err);
            return next(err);
          }
          const features = await featuresDao.findAllFeatures();
          const books = await bookDao.findAllBooks();

          // fill feature properties (?)
          features.forEach(feature => {
              books.forEach(book => {
                  if (book.id === feature.bookId) {
                      feature.book = book;
                  }
              });
          });

          res.render("index", {
              user: user,
              features: features,
              books: books,
              styles: ['/stylesheets/index.css'],
              scripts: ['/javascripts/index.js']
          });

          logger.logInfo("User logged in successfully");
      });
  })(req, res, next);
});

module.exports = router;