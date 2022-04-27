"use strict";

const express = require('express');
const router = express.Router();
const logger = require('../util/logger');

/* GET Registrazione Cliente page. */
router.get('/', function(req, res, next) {
  res.render('regCliente', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'            // Orari
             ,'/javascripts/richiedimodals.js'            // Modals
             ,'/javascripts/validazioneRegistrazione.js'] // Validazione form registrazione
  });
});

// Server side validation
/*
router.post("/", [
  body("nome").trim().matches(/^[a-zA-Z ]{1,50}$/).escape().withMessage("Inserisci un nome valido"),
  body("cognome").trim().matches(/^[a-zA-Z ]{1,50}$/).escape().withMessage("Inserisci un cognome valido"),
  body("email").trim().isEmail().withMessage("Inserisci un'email valida").escape()
      .custom(async function (email) {
          const cliente = await utenteDao.findClienteByEmail(email);

          if(!cliente.hasOwnProperty("error")) { // Se findUserByEmail trova un cliente e non l'errore "Cliente non trovato"
              logger.logDebug(`Esiste già un cliente con l'email ${email}`);
              throw new Error("L'email inserita è già in uso.");
          }
      }),
  body("telefono").trim().matches(/^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$/).escape().withMessage("Il numero di telefono deve essere di 10 numeri e può contenere il prefisso italiano (+39)"),
  body("password").matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?]).{4,}$/).escape().withMessage("La password deve avere almeno 4 caratteri, contenere una minuscola, una maiuscola, un numero e un carattere speciale"),
], async function (req, res) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {

      if (req.body['confirm-password'] !== req.body.password) {
          throw new Error("Passwords do not match");
      }

      const user = new User(
          undefined,
          req.body.fname,
          req.body.lname,
          req.body.email,
          req.body.password,
          Type.CUSTOMER
      );

      // add the new user to the database
      let userId = await userDao.addUser(user);
      logger.logInfo(`New user added with id: ${userId}`);

      res.render("login", {
          title: "Login",
          message: "Successfully registered",
          styles: ['/stylesheets/forms.css']
      });
  } else {
      logger.logError(JSON.stringify(errors));

      res.render("register", {
          title: "Register",
          errors: errors.array(),
          styles: ['/stylesheets/forms.css'],
          scripts: ['/javascripts/register-form.js']
      });
  }
});
*/

module.exports = router;