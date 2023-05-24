var express = require('express');
var router = express.Router();
var check_login = require('../middleware/check_login');

var UserController=require('../controllers/user.controller');
const bodyParser =require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))



router.get('/',check_login.yeu_cau_dnhap_admin,UserController.getUser);
router.post('/login',UserController.login);
router.post('/signup', UserController.singup);
router.post('/logout', UserController.logout)

router.post('/searchUser',UserController.searchUser);
router.post('/reload',UserController.reloadUser)
router.post('/delete',UserController.deleteUser);
router.post('/update',UserController.editUser);
module.exports = router;
