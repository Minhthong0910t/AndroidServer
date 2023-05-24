
var md=require('../../model/sanpham.model')

exports.list= async (req,res,next)=>{
    try {
        let products= await md.prModel.find().populate('id_category');
        if(products){
            let modelList=products.map(item=>{
                return{
                    _id:item._id,
                    name: item.name,
                    price: item.price,
                    mota: item.mota,
                    img: item.img,
                    groupName: item.id_category.name
                }
            })
            return res.status(200).json({data: modelList,msg:'lấy dữ liệu thành công'});
                
        }else{
            return res.status(204).json(
                {
                    msg: 'không có dữ liệu'
                }
            );
        }
    } catch (error) {
        return res.status(error.status)
                .json({
                    msg:error.message

                });

        
    }

}
exports.search= async (req, res, next)=>{
    console.log(req.body);
    let regex= new RegExp(req.body.searchQuery,"i");
    let listProduct= await md.prModel.find({name:regex}).populate('id_category');

    if(listProduct){
        let modelList=listProduct.map(item=>{
            return{
                _id:item._id,
                name: item.name,
                price: item.price,
                mota: item.mota,
                img: item.img,
                groupName: item.id_category.nameLoai
            }
        });
        return res.status(201).json({data: modelList,msg:'lấy dữ liệu thành công'})
    }else{
        return res.status(204).json({msg:'không có dữ liệu'})
    }
}