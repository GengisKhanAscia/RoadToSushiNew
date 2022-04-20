var express = require('express');
var router = express.Router();

/* GET Personale page. */
router.get('/', function(req, res, next) {
  res.render('personale', {
    styles: ['/stylesheets/custom.css'],
    scripts: ['/javascripts/orario_negozio.js'     // Orari
             ,'/javascripts/richiedimodals.js']    // Modals
  });
});

module.exports = router;

/*
  <script defer src="js/listadip_dipendente.js"></script>
  <script defer src="js/listadip_dipendenteManager.js"></script> 
  <script defer src="js/listadip_app.js"></script>
  <script defer src="js/listadip_main.js"></script>
*/