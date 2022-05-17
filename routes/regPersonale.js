"use strict";

const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const logger = require('../util/logger');
const utenteDao = require('../dao/utenteDao');
const EntUtente = require('../entities/entUtente');
const EntPersonale = require('../entities/entPersonale');

const upload = multer({
  storage: multer.memoryStorage() /* ,
  limits: {
    fileSize: 5 * 1024 * 1024
  } */
});

/* GET Registrazione Personale page. */
router.get('/', function(req, res, next) {
  res.render('regPersonale', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'            // Orari
             ,'/javascripts/richiedimodals.js'            // Modals
             ,'/javascripts/validazioneRegistrazione.js'] // Validazione form registrazione
  });
});

// Server side validation
router.post("/", upload.single('imgPersonale'), [
  body("nome").trim().matches(/^[a-zA-Z ]{1,50}$/).escape().withMessage("Inserisci un nome valido"),
  body("cognome").trim().matches(/^[a-zA-Z ]{1,50}$/).escape().withMessage("Inserisci un cognome valido"),
  body("email").trim().isEmail().withMessage("Inserisci un'email valida").escape()
      .custom(async function (email) {
          const personale = await utenteDao.findPersonaleByEmailAndTipo_utente(email);

          if(!personale.hasOwnProperty("error")) { // Se findPersonaleByEmailAndTipo_utente trova un membro del personale e non l'errore "Membro del personale non trovato"
              logger.logDebug(`Esiste già un membro del personale con l'email ${email}`);
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

    const personale = new EntPersonale(
        req.body.email,
        req.body.nome,
        req.body.cognome,
        req.body.telefono,
        req.file.buffer
    );

    // Aggiungo Utente
    let utenteId = await utenteDao.addPersonaleComeUtente(utente);
    logger.logInfo(`Nuovo utente aggiunto con l'email: ${utenteId}`);

    // Aggiungo Personale
    let personaleId = await utenteDao.addPersonale(personale);
    logger.logInfo(`Nuovo personale aggiunto con l'email: ${personaleId}`);

    res.render("login", {
        title: "Login",
        message:`${personale.nome} ${personale.cognome} benvenuto nel personale!`, 
        styles: ['/stylesheets/custom.css'],
        scripts: ['/javascripts/validazioneLogin.js','/javascripts/orario_negozio.js', '/javascripts/richiedimodals.js']
    });
  } else {
    logger.logError(JSON.stringify(errors));

    res.render("regPersonale", {
        title: "Registrazione Personale",
        errors: errors.array(),
        styles: ['/stylesheets/custom.css'],
        scripts: ['/javascripts/orario_negozio.js', '/javascripts/richiedimodals.js', '/javascripts/validazioneRegistrazione.js']
    });
  }
});

module.exports = router;