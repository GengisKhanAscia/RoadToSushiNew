var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', function(req, res, next) {
  res.render('home', {
    styles: ['/stylesheets/custom.css'], 
    scripts: ['/javascripts/orario_negozio.js'      // Orari
             ,'/javascripts/richiedimodals.js'],    // Modals
    utente: req.user  
  });
});

router.delete("/logout", (req, res, next) => {
  logger.logInfo("Utente uscito con successo!");
  req.logout();
  res.end();
});

module.exports = router;