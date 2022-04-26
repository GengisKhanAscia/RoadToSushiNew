var express = require('express');
var router = express.Router();

/* GET Registrazione Personale page. */
router.get('/', function(req, res, next) {
  res.render('regPersonale', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'            // Orari
             ,'/javascripts/richiedimodals.js'            // Modals
             ,'/javascripts/validazioneRegistrazione.js'] // Validazione form registrazione
  });
});

module.exports = router;