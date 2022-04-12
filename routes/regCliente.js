var express = require('express');
var router = express.Router();

/* GET Registrazione Cliente page. */
router.get('/', function(req, res, next) {
  res.render('regCliente', {
    styles: ['/stylesheets/custom.css']
  });
});

module.exports = router;