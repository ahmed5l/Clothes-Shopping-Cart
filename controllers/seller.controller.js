const Product=require("../model/product.model")
const Order=require("../model/order.model")

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


const showSellerPage=(req,res)=>{
    Order.find().populate('user','userName').then(product =>{

        let product1=[];
        let userName;
          
          product.forEach(cart =>{
             userName =cart.user.userName;
              let cart1=cart.cart;
              cart1.selectesProduct.forEach(products =>{
                  if(products.brand ===req.user.userName){
                    product1.push(products)
                  }
              })              
          })   
          res.render('pages/seller.ejs',{
            title :"Seller",
            products:product1,
            userName:userName
        })

    })
   


}


  const products=(req,res)=>{
      Product.find({brand :req.user.userName}).then(product=>{
            res.render("pages/sellerProduct.ejs",{
                title:"sellerProduct",
                product:product

            })      



          
      })
      .catch(err=>{console.log(err)})

  }


  const showupdateProduct=(req,res)=>{
      console.log(req.params.id)
      let massageError=req.flash('productError')
        console.log(massageError)
      Product.findById(req.params.id)

      .then(product=>
        
       {console.log(product)

      res.render("pages/updateProduct.ejs",{
        title:"updateProduct",
        product:product,
        massages:massageError
      
       } )
    }).catch(err=> {throw new Error(err)})
  }

  


  const updateProduct=(req,res)=> {
    
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


 
 const updateProduct1 ={
     productName:req.body.name,
     price:req.body.price,
     imagePath:req.file.path,
     brand:req.user.userName,
     description:req.body.description,
     shortDescription:req.body.shortDescription,
     category:req.body.category,
     price:req.body.price,
     discount:req.body.discount,
     sizes:result
 }
 Product.updateOne({_id:req.params.id},{set:updateProduct1}).then(doc=>
  {
 console.log(doc)
 res.redirect("/")

  
}).catch(err=>console.log(err))
}

module.exports={
    showSellerPage,
    products,
    showupdateProduct,
    updateProduct,
    upload
}