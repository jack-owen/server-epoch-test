var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('time is x');
});

module.exports = router;
