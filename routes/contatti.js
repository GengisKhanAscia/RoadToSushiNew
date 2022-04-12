var express = require('express');
var router = express.Router();

/* GET Contatti page. */
router.get('/', function(req, res, next) {
  res.render('contatti', {
    styles: ['/stylesheets/custom.css']
  });
});

module.exports = router;