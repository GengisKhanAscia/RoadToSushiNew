var express = require('express');
var router = express.Router();

/* GET Registrazione Personale page. */
router.get('/', function(req, res, next) {
  res.render('regPersonale', {
    styles: ['/stylesheets/custom.css']
  });
});

module.exports = router;