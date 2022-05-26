var express = require('express');
var router = express.Router();

/* GET Aggiungi Piatto page. */
router.get('/', function(req, res, next) {
  res.render('aggpiatto', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'     // Orari
             ,'/javascripts/richiedimodals.js'],   // Modals
    utente: req.user
  });
});

module.exports = router;