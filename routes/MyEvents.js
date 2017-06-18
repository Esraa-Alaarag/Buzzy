var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/queries')

/* GET home page. */
router.get('/', db.getAllEvents); 
router.delete('/:ss', db.removeEvent);


module.exports = router;
