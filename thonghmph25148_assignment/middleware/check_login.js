exports.yeu_cau_dnhap=(req,res,next)=>{
    if(req.session.userLogin){
        //có tồn tại sesstion
        next();
    }else{
        //không tồn tại thông tin đăng nhập
        //cchuyên sang trang đnhap
        return res.render('home/home',{message:'Bạn phải đăng nhập mới sử dụng được chức năng này',req:req});
    }
}
exports.yeu_cau_dnhap_admin=(req,res,next)=>{
    if(req.session.userLogin && req.session.userLogin.group==='Admin'){
        //có tồn tại sesstion
        next();
    }else{
        //không tồn tại thông tin đăng nhập
        //cchuyên sang trang đnhap
        return res.render('home/home',{message:'Bạn phải đăng nhập tài khoản Admin mới sử dụng được chức năng này',req:req});
    }
}
exports.k_yeu_cau_dnhap=(req,res,next)=>{
    if(!req.session.userLogin){
        next();
    }
    else{
        return res.redirect('/users');
    }
}