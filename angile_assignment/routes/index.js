var express = require('express');
var router = express.Router();

var HomeCtrl=require('../controllers/home.controller');
router.get('/',HomeCtrl.home);

module.exports = router;
