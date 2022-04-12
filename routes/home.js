var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', function(req, res, next) {
  res.render('home', {
    styles: ['/stylesheets/custom.css'], 
    scripts: ['/javascripts/navbarfootbar.js'       // Navfoot
             , '/javascripts/orario_negozio.js'     // Orari
             , '/javascripts/richiedimodals.js']    // Modals  
  });
});

module.exports = router;