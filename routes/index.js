var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/queries')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BUZZY' });
});

router.post('/', db.AddEvent);

module.exports = router;
