var db=require('./db');
// định nghĩa khuôn mẫu cho sản phẩm
const userSchema=new db.mongoose.Schema(
    {
        userName:{type:String, required: true},
        password:{type:String, required: true},
        email:{type:String, required: true},
        group:{type:String, required: false},
    },
    {
        collection:'db_user'
    }
);


//tạo model
let userModel= db.mongoose.model('userModel',userSchema);
//
module.exports={userModel};