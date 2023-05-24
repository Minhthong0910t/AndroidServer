var express=require('express');
var router=express.Router();
const multer  = require('multer')
const upload = multer({ dest: './tmp' })


var productCtrl=require('../controllers/products.controller');


router.get('/loai_product',productCtrl.listLoai);
router.get('/:i',productCtrl.list);




router.post('/addProduct',upload.single('productImage'), productCtrl.add);
router.post('/update',upload.single('productImage'),productCtrl.editProduct);
router.post('/delete', productCtrl.deleteProduct);
router.post('/filter', productCtrl.filterProduct);
router.post('/arrange', productCtrl.arrangeProduct);


//loai sp
router.post('/addCategory',productCtrl.addCategory);
router.post('/deleteCategory',productCtrl.deleteCategory);
router.post('/updateCategory',productCtrl.updateCategory);

module.exports=router;