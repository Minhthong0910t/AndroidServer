var myMDUser=require('../model//users.model')
const bcrypt = require('bcrypt');

exports.getUser=async (req,res,next)=>{

    let listUser= await myMDUser.userModel.find().sort({id:1});


    // res.render('products/list_product',{listProduct:list,title:"Tất Cả Sản Phẩm"});
    res.render('users/user',{listUser: listUser,req:req})
};

exports.searchUser=async (req,res,next)=>{
    let msg='';
    let regex = new RegExp(req.body.userName,'i');
    let listUser= await myMDUser.userModel.find({userName:regex});
    if(listUser.length == 0){
        msg='Không có tên tài khoản phù hợp'+req.body.userName;
        console.log(msg);
    }
    console.log("đã tìm thấy user"+ listUser);
    res.render('users/user',{listUser: listUser,req:req})

}
exports.reloadUser = async (req,res,next) => {   
    res.redirect('/users');
    
}

exports.singup= async (req,res,next)=>{
    let msg='';
    // console.log(req.method);
    //lấy ds category truyền vào
    if(req.method=='POST'){

        if (req.body.userPassword == req.body.checkPassWord) {
            // //tạo đối tuọng để gán dữ liệu
            const salt= await bcrypt.genSalt(10);

                let objUser=new myMDUser.userModel();
                objUser.userName=req.body.userName;
                objUser.password=req.body.userPassword;
                objUser.email=req.body.userEmail;
                objUser.group=req.body.userGroup;

                objUser.password= await bcrypt.hash(req.body.userPassword,salt);
            // Thực hiện ghi vào CSDL
            try {
                let new_User = await objUser.save();
                console.log('đăng ký thành công '+new_User);
                return res.redirect('/users');
            } catch (error) {
                msg = 'Lỗi Ghi CSDL: ' + error.message;
                console.log(error);
                return res.redirect('/users');
            }
        } else {
            msg = 'Mật Khẩu Không Trùng Khớp'
            console.log(msg);
            return res.redirect('/users');
        }
    }
};


exports.deleteUser= async (req,res,next)=>{
    await myMDUser.userModel.deleteOne({_id: req.body.productIdDelete});
    res.redirect('/users');

}

exports.editUser= async(req,res,next)=>{

    let msg='';

    if(req.method=='POST'){

        let objUser=new myMDUser.userModel();

        objUser.userName=req.body.UserName;
        objUser.password=req.body.userPassword;
        objUser.email=req.body.emailUser;
        objUser.group=req.body.groupUser;
        objUser._id=req.body.userId;


        try {
            await myMDUser.userModel.findByIdAndUpdate({_id: req.body.userId},{$set: objUser});
            console.log("đã sữa");
        } catch (error) {
            console.log('loi chưa sửa đc' + error);
        }
    }

    res.redirect('/users');
}

///login

exports.login = async(req, res, next) => {
    let msg='';
    if(req.method == 'POST'){
        
        try {
            
            let objUser=await myMDUser.userModel.findOne({userName: req.body.userName});
            console.log(objUser);
            if(!objUser){
                console.log("sai thông tin đnhap");
                return res.render('home/home',{msg: 'Tài khoản không đúng vui lòng đăng nhập lại',req: req});
                
            }else{
                //có tồn tại tk
                const isPasswordMatch = await bcrypt.compare(req.body.passwordUser, objUser.password);
                if(!isPasswordMatch){
                    console.log("sai mk");
                return res.render('home/home',{msg: 'bạn nhập sai mật khẩu vui lòng đăng nhập lại',req: req});
                    
                }else{
                    console.log("đăng nhập thành công");
                    req.session.userLogin=objUser;
                }
        }
        return res.redirect('/');

        }catch (error) {
            console.log(error);
            return res.redirect('/');
        }

    }
}
exports.logout=(req,res,next) => {
    req.session.destroy((err)=>{
        if(err) {
            console.log(err);
        }else{
            res.redirect('/');
        }
    });

}