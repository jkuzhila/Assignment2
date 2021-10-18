/* file name : users.js   James Kuzhilaparambil  301119040  10/18/2021*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
