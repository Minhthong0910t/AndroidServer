var db=require('./db');
// định nghĩa khuôn mẫu cho sản phẩm
const prSchema=new db.mongoose.Schema(
    {
        name:{type:String, required: true},
        price:{type:Number, required: true},
        img:{type:String, required: false},
        mota:{type:String,require:false},
        id_category:{type:db.mongoose.Schema.Types.ObjectId,ref:'CategoryModel'}
    },
    {
        collection:'san_pham'
    }
);

//tạo model
let prModel= db.mongoose.model('prModel',prSchema);


//
let CategorySchema= new db.mongoose.Schema(
    {
        nameLoai:{type:String, required: true},
        mota:{type:String, required: true},
        
    },
    {
        collection:'loai_san_pham',
    }
)
//tạo model
let CategoryModel= db.mongoose.model('CategoryModel',CategorySchema);


module.exports={prModel,CategoryModel};