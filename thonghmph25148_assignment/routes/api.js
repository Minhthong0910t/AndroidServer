var express = require('express');
var router = express.Router();

var product_api=require('../controllers/api/products.api');
var user_api=require('../controllers/api/users.api');

//api user

router.get('/users',user_api.list);

router.post('/users/login',user_api.login);
router.post('/users/register',user_api.register);


// URL: GET: /api/product
router.get('/products',product_api.list);
router.post('/products/search',product_api.search);






module.exports = router;