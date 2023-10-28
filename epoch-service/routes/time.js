var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send({ epoch: '2023-10-28T10:31:18.822Z' });
});

module.exports = router;
