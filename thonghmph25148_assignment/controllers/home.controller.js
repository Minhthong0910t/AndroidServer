exports.home=(req,res,next)=>{
    let msg='';
    res.render('home/home',{msg:msg,req:req});
}