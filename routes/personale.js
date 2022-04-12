var express = require('express');
var router = express.Router();

/* GET Personale page. */
router.get('/', function(req, res, next) {
  res.render('personale', {
    styles: ['/stylesheets/custom.css']
  });
});

module.exports = router;