const User=require('../model/users.model')
const Order=require("../model/order.model")
const multer=require('multer');




const storage =multer.diskStorage({
     
  destination :function (req,file ,cb){
    cb(null ,'./public/uploads/')
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

const showProfile=(req,res)=>{
  if(req.user.cart){
    totalProduct=req.user.cart.totalquantity
  }
  else {
    totalProduct=0
  }
  Order.find({user: req.user._id }) .then(order=>{
    console.log(order)
    res.render("pages/profile.ejs",{
      title:"Profile",
      totalProduct:totalProduct,
      userOrder:order,
      checkUser:true,
      isProfile:true,
      user:req.user
  })  
  }).catch(err=>{
    throw new Error(err)
  })

    
}


const updateUser=(req,res)=>{
    const newUpdateUser={
        email:req.body.email,
        userName:req.body.name,
        contact:req.body.phone,
        address:req.body.address,
        image:req.file.path.slice(7),
        //password:new User().hashPassword(req.body.password),

        isAdmin:false,
        isSeller:false
    }

    User.updateOne({_id :req.user._id} ,{$set :newUpdateUser} ,(err,doc)=>{
        if(err){
          console.log(err)
        }else{
          console.log(doc)
          res.redirect("/profile")
        }
      })

}

module.exports={
    showProfile,
    updateUser,
    upload
}



