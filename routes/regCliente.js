"use strict";

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const logger = require('../util/logger');
const utenteDao = require('../dao/utenteDao');
const EntUtente = require('../entities/entUtente');
const EntCliente = require('../entities/entCliente');

/* GET Registrazione Cliente page. */
router.get('/', function(req, res, next) {
  res.render('regCliente', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'             // Orari
             ,'/javascripts/richiedimodals.js'             // Modals
             ,'/javascripts/validazioneRegistrazione.js'], // Validazione form registrazione
    title: "Registrazione Cliente"
  });
});

// Server side validation
router.post("/", [
  body("nome").trim().matches(/^[a-zA-Z ]{1,50}$/).escape().withMessage("Inserisci un nome valido"),
  body("cognome").trim().matches(/^[a-zA-Z ]{1,50}$/).escape().withMessage("Inserisci un cognome valido"),
  body("email").trim().isEmail().withMessage("Inserisci un'email valida").escape()
      .custom(async function (email) {
          const cliente = await utenteDao.findClienteByEmailAndTipo_utente(email);

          if(!cliente.hasOwnProperty("error")) { // Se findClienteByEmailAndTipo_utente trova un cliente e non l'errore "Cliente non trovato"
              logger.logDebug(`Esiste già un cliente con l'email ${email}`);
              throw new Error("L'email inserita è già in uso.");
          }
      }),
  body("telefono").trim().matches(/^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{7}$/).escape().withMessage("Il numero di telefono deve essere di 10 numeri e può contenere il prefisso italiano (+39)"),
  body("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{4,}$/).escape().withMessage("La password deve avere almeno 4 caratteri, contenere una minuscola, una maiuscola, un numero e un carattere speciale"),
  body("invalidCheck")  
    .custom(function (invalidCheck) {
        if(invalidCheck !== 'on'){
            throw new Error("Non hai spuntato la checkbox della privacy.");
        }
        else{
            return true;
        }
    })
    
], async function (req, res) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {

    const utente = new EntUtente(
        req.body.email,
        req.body.password,
        req.body.tipo_utente,
    );

    const cliente = new EntCliente(
        req.body.email,
        req.body.nome,
        req.body.cognome,
        req.body.telefono,
    );

    // Aggiungo Utente
    let utenteId = await utenteDao.addClienteComeUtente(utente);
    logger.logInfo(`Nuovo utente aggiunto con l'id: ${utenteId}`);

    // Aggiungo Cliente
    let clienteId = await utenteDao.addCliente(cliente);
    logger.logInfo(`Nuovo cliente aggiunto con l'id: ${clienteId}`);

    res.render("login", {
        title: "Login",
        message:`${cliente.nome} ${cliente.cognome} ti sei registrato con successo!`, 
        styles: ['/stylesheets/custom.css'],
        scripts: ['/javascripts/validazioneLogin.js']
    });
  } else {
    logger.logError(JSON.stringify(errors));

    res.render("regCliente", {
        title: "Registrazione Cliente",
        errors: errors.array(),
        styles: ['/stylesheets/custom.css'],
        scripts: ['/javascripts/orario_negozio.js', '/javascripts/richiedimodals.js', '/javascripts/validazioneRegistrazione.js']
    });
  }
});

module.exports = router;