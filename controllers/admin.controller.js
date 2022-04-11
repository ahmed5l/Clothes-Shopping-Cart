const Order=require('../model/order.model')


const showAdmin=(req,res)=>{
      //let massageError=req.flash('signErro')

     Order.find().populate('user','userName')
     .then(order=>{

        res.render('pages/admin.ejs' ,{
            title:"admin",
            order:order,
            checkUser:true,
            isProfile:false,
           
    
        })
        
        })
     .catch(err=>{
         throw new Error(err)
     })

   
}


const showCreateSeller=(req,res)=>{
    let massageError=req.flash('signupError')
    res.render("pages/cresteSeller.ejs",{
        checkUser:true,
        isProfile:false,
        title:"Create Seller",
        massages:massageError

    })
}


  /*const getAllOreder=(req,res)=>{
      Order.find().then(order=>{
           

      })

} */



module.exports={
    showAdmin,
    showCreateSeller
}