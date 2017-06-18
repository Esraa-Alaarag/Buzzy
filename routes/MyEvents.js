var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/queries')

/* GET home page. */
router.get('/', db.getAllEvents); 
router.delete('/:id', db.removeEvent);


module.exports = router;
