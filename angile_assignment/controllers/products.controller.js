const fs = require('fs');
var MyMD=require('../model/sanpham.model');
const { log } = require('console');


exports.list= async (req,res,next)=>{

  let page=req.params.i;
  let perPage=5;
  let listLoai= await MyMD.CategoryModel.find();

  //tính vị trí bắt ptu trong trang
  let start=(page-1)*perPage;

  
  let list= await MyMD.prModel.find().populate('id_category').skip(start).limit(perPage);

  let msg="sản phẩm có: " + list.length;

  let countlist= await MyMD.prModel.find().populate('id_category');

  let count = countlist.length/perPage;
  count=Math.ceil(count);


    res.render('products/list_product',{listProduct:list,listLoai:listLoai,title:"Tất Cả Lớp",req:req,countPage:count});
}



exports.add= async (req,res,next)=>{
    var url_image='';
    let msg='';
    //lấy ds category truyền vào
    if(req.method=='POST'){

        try {
            await fs.rename(
              req.file.path,
              "./public/uploads/" + req.file.originalname,
              function (err) {
                if (err) throw err;
                //không có lỗi ==> upload thành công
                url_image = "/uploads/" + req.file.originalname;
                console.log("upload thanh cong" + url_image);
              }
            );
          } catch (error) {
            // nếu có lỗi thì xảy ra lỗi ở đây
            console.log(error);
          }

          if(req.file != undefined) {
            let objProduct=new MyMD.prModel();
            objProduct.name=req.body.productName;
            objProduct.price=req.body.productPrice;
            objProduct.img=req.file.originalname;
            objProduct.id_category=req.body.productGroup;
            objProduct.mota=req.body.productDescribe;
            try{
                let new_product = await objProduct.save();
                console.log(new_product);
                
            }catch(err){
                console.log(err);
            }
        }else{
            let objProduct=new MyMD.prModel();
            objProduct.name=req.body.productName;
            objProduct.price=req.body.productPrice;
            objProduct.id_category=req.body.productGroup;
            objProduct.mota=req.body.productDescribe;
            try{
                let new_product = await objProduct.save();
                console.log(new_product);
                
            }catch(err){
                console.log(err);
            }
        }
}

res.redirect('/product/1')
}
//edit sanpham

exports.editProduct= async (req,res,next)=>{
    let msg='';

    if(req.method=='POST'){

      try {
        await fs.rename(
          req.file.path,
          "./public/uploads/" + req.file.originalname,
          function (err) {
            if (err) throw err;
            //không có lỗi ==> upload thành công
            url_image = "/uploads/" + req.file.originalname;
            console.log("upload thanh cong" + url_image);
          }
        );
      } catch (error) {
        // nếu có lỗi thì xảy ra lỗi ở đây
        console.log(error);
      }    
        //viêt kiểm tra điều kiện
        //tạo đối tượng model đẻ gán dữ liệu

        if(req.file!=undefined){
        let objProduct=new MyMD.prModel();
        objProduct.name=req.body.productName;
        objProduct.price=req.body.productPrice;
        objProduct.img=req.file.originalname;
        objProduct.mota=req.body.productDescribe;
        objProduct.id_category=req.body.productGroup;
        objProduct._id=req.body.productId;      

        try {
            await MyMD.prModel.findByIdAndUpdate({_id:  req.body.productId}, { $set: objProduct });
            
            console.log("đã sửa");
            
        } catch (error) {
            msg='Lỗi ghi CSDL: '+error.message;
            console.log(error);
            console.log("Chưa sửa được");

            }
          }
            else{

              let objProduct=new MyMD.prModel();
              objProduct.name=req.body.productName;
              objProduct.price=req.body.productPrice;
              objProduct.mota=req.body.productDescribe;
              objProduct.id_category=req.body.productGroup;
              objProduct._id=req.body.productId;   
              

          try {
              await MyMD.prModel.findByIdAndUpdate({_id:  req.body.productId},objProduct);
              msg="Đã cập nhật thành công";
              
          } catch (error) {
              msg='Lỗi ghi CSDL: '+error.message;
              console.log(error);
      }

        }
        
}

res.redirect('/product/1');

}


//delete

exports.deleteProduct= async (req, res,next) => {
  await MyMD.prModel.deleteOne({ _id: req.body.productIdDelete });
  res.redirect('/product/1');
}

//lọc
exports.filterProduct= async (req,res,next)=>{

  let msg='';
  let title='';

  if(req.body.filter==""){
    res.redirect('/product/1');
  }else{
    let listCategory= await MyMD.CategoryModel.find();
    let listProduct= await MyMD.prModel.find({id_category: req.body.filter}).populate('id_category');
    let Category= await MyMD.CategoryModel.findOne({_id: req.body.filter});
    title=Category.nameLoai;

    if(listProduct.length==0){
      msg='không có sản phẩm nào thuộc loại '+listCategory.nameLoai;
    }else{
      msg= listProduct.length + 'thuộc loại sản phẩm '+listCategory.nameLoai;
    }
    console.log(listProduct.length,listCategory.length);
    let count=0;
    console.log('lọc được sản phẩm'+listProduct);
    res.render('products/list_product',{listProduct: listProduct,listLoai: listCategory,title:title, msg:msg,req:req,countPage:count});

  }
  

}
// sắp xếp
exports.arrangeProduct = async(req, res,next) => {


  let msg='';
  let title='';
  if(req.body.arrange==''){
    res.redirect('/product/1');
  }else{
    if(req.body.arrange=="1"){
      let listCategory= await MyMD.CategoryModel.find();
      let listProduct= await MyMD.prModel.find().populate('id_category').sort({name:1});
      let count = 0;
      res.render('products/list_product',{listProduct: listProduct,listLoai: listCategory,title:title, msg:msg,req:req,countPage:count});
    }else{
      let listCategory= await MyMD.CategoryModel.find();
      let listProduct= await MyMD.prModel.find().populate('id_category').sort({name:-1});
      let count = 0;
      res.render('products/list_product',{listProduct: listProduct,listLoai: listCategory,title:title, msg:msg,req:req,countPage:count});
    }
  }


}


//loai sp

exports.listLoai= async (req,res,next)=>{
  var message='';
  let listLoai= await MyMD.CategoryModel.find();
  console.log("list vip"+listLoai);

  res.render('products/loai_product',{listLoai:listLoai,title:"Loại Sản Phẩm",message:message,req:req});

}

//add loai sp

exports.addCategory= async (req,res,next)=>{

  let msg='';
  //lấy ds category truyền vào
  if(req.method=='POST'){      

      // //tạo đối tuọng để gán dữ liệu

      let objCategory=new MyMD.CategoryModel();
      objCategory.nameLoai=req.body.categoryName;
      objCategory.mota=req.body.categoryDescribe;
      try {
          let new_product=await objCategory.save();
          // console.log(new_product);
          msg=' thêm mới thành công';

      } catch (error) {
          msg='Lỗi ghi CSDL: '+error.message;
          console.log(error);
      }
}

res.redirect('/product/loai_product');
}

exports.deleteCategory= async (req, res,next) => {
  await MyMD.CategoryModel.deleteOne({ _id: req.body.productIdDelete });
  res.redirect('/product/loai_product');
}
exports.updateCategory = async (req, res, next) => {
    
  if (req.method == "POST") {
    
      
          let objCategory = new MyMD.CategoryModel();
          objCategory.nameLoai = req.body.categoryNameLoai;
          objCategory.mota = req.body.categoryDescribe;
          objCategory._id = req.body.categoryID;
         
          try{
           await MyMD.CategoryModel.findByIdAndUpdate({_id:  req.body.categoryID}, { $set: objCategory });
           console.log("đã sửa");
  
          }catch(err){
              console.log(err);
              console.log("Chưa sửa được");
          }
      
      
  }
  res.redirect('/product/loai_product');
}



