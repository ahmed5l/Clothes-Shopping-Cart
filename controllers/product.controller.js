const express=require('express');
const  app=express()
const Product=require("../model/product.model")




const multer=require('multer');




const storage =multer.diskStorage({
     
  destination :function (req,file ,cb){
    cb(null ,'./public/uploads')
  },
  filename :function(req,file,cb){
    cb(null ,new Date().toDateString()+file.originalname)
  }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
        cb(null ,true)

    }else{
        cb(null ,false);

    }
}

const upload=multer({
   storage:storage,
   limits:{
       fileSize:1024*1024*5
   },
   fileFilter :fileFilter
});




const addproduct=(req,res)=>{
    res.render("pages/addProduct.ejs",{
        title:"addProduct",
        checkUser:true
    })
}

 



const getproduct=(req,res)=>{
    if(req.user.cart){
        totalProduct=req.user.cart.totalquantity
      }
      else {
        totalProduct=0
      }
    Product.findById(req.params.id).then(product =>{
          console.log(product.sizes)
          Product.find().then(products=>{
               
        res.render("pages/product.ejs",{
          title:"Product",
          checkUser:true,
          product:product,
          products:products,
          totalProduct:totalProduct
         
          
      })

          }).catch(err =>{
            new Error(err)
         })
    

    }).catch(err =>{
       new Error(err)
    })
  
}




const eventAddProduct=(req,res)=>{
    
    const sizes=[]
     sizes.push(req.body.xs)
     sizes.push(req.body.s)
     sizes.push(req.body.m)
     sizes.push(req.body.l)
     sizes.push(req.body.xl)
     sizes.push(req.body.xxl)
     sizes.push(req.body.xxxl)
     sizes.push(req.body.a)
     sizes.push(req.body.b)
     sizes.push(req.body.c)
     sizes.push(req.body.d)
     sizes.push(req.body.e)
     sizes.push(req.body.f)
     sizes.push(req.body.g)
     const result = sizes.filter(size =>size !=undefined);

          console.log(result)
   const product =new Product({
        productName:req.body.name,
        price:req.body.price,
        imagePath:req.file.path.slice(7),
        brand:req.user.userName,
        description:req.body.description,
        shortDescription:req.body.shortDescription,
        category:req.body.category,
        price:req.body.price,
        discount:req.body.discount,
        sizes:result,
    })
    product.save()
    .then(doc=>{
        res.redirect('/product')
    })
    .catch(err=>{
      throw  new Error(err)
    })

}


module.exports={
    addproduct,
    eventAddProduct,
    getproduct,
    upload
}