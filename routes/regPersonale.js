var express = require('express');
var router = express.Router();

/* GET Registrazione Personale page. */
router.get('/', function(req, res, next) {
  res.render('regPersonale', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'     // Orari
             ,'/javascripts/richiedimodals.js'     // Modals
             ,'../routes/form_validazione.js']     // Validazione del form  
  });
});

module.exports = router;