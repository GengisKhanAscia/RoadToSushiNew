var express = require('express');
var router = express.Router();

/* GET Piatti page. */
router.get('/', function(req, res, next) {
  res.render('piatti', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'     // Orari
             ,'/javascripts/richiedimodals.js'],   // Modals
    utente: req.user
  });
});

module.exports = router;

/*
  <script defer src="js/listadip_dipendente.js"></script>
  <script defer src="js/listadip_dipendenteManager.js"></script> 
  <script defer src="js/listadip_app.js"></script>
  <script defer src="js/listadip_main.js"></script>
*/