var express = require('express');
var router = express.Router();
const config = require('../config/config.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/status', function (req, res, next) {
  return res.status(200).json({
    "service": config.app.NAME,
    "version": config.app.VERSION,
  })
});

module.exports = router;
