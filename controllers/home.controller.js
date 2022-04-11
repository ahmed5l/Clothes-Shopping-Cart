 const Product=require("../model/product.model")

const showHome=(req,res)=>{
    
   
    if( req.isAuthenticated() && req.user.cart){
        totalProduct=req.user.cart.totalquantity
      }
      else {
        totalProduct=0
      }

    

    Product.find().then(product=>{
      
        res.render("pages/home.ejs",{
            title:"home",
            totalProduct:totalProduct,
            checkUser:req.isAuthenticated(),
            isProfile:false,
            product:product
        })

    }).catch(err=>{
        throw new Error(err)
    })
   
}

  const search=(req,res)=>{
      console.log(req.body.b)
      const re=new RegExp((req.body.b),'gi')
      console.log(re)
      Product.find().or([{ 'brand': { $regex: re }}, { 'productName': { $regex: re }}])
      .then(product=>{
        console.log(product)
          res.render('pages/search.ejs',{
              title:"Search Of Product",
              checkUser:req.isAuthenticated(),
              product:product
          })
        })
  }


module.exports={
    showHome,
    search
}