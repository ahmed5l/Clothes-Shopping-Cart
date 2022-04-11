const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    imagePath:{type:String,required:true},
    productName :{type:String,required:true},
    brand :{type:String,required:true},
    description :{type:String,required:true},
    shortDescription :{type:String},
    category :{type:String,required:true},
    price:{type:Number,required:true},
    sizes:{type:Array ,required:true},
    discount:Number

})

module.exports=mongoose.model('Product' ,productSchema)
