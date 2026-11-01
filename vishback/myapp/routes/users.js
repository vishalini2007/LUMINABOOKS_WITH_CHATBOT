var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/contact', function(req, res, next) {
  res.send('we will contact u soon');
});
module.exports = router;
