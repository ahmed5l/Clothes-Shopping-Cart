
const order=require('../model/order.model')
const PUBLISHABLE_KEY="pk_test_51JylQHEnTWYohCMYQgwI9ANhQgugvqkEv10OARsycNkpi5ZDiOMo5CoYwReXlybcXejuwbMTby1KJTRKrsKEufVz00FVtu2MEa"
const SECRET_KEY="sk_test_51JylQHEnTWYohCMY1miBjWraKTVMUG35UWTzoBaYUXI7kckCV13T2BqKVyaHxpdT80H6O5myH2KpRrs8o0VvUx6Y00mXZQ3bBV"
const stripe = require('stripe')(SECRET_KEY) 


const PostChe= function(req, res){ 

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: req.user.name, 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '110092', 
            city: 'Zagziag', 
            state: 'Ahmed', 
            country: 'Egypt', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: req.user.cart.totalPrice *100,    // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'USD', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        req.flash('success' ,"successfully")

        const order1 =new order({
            user:req.user._id,
            cart:req.user.cart,
            address:"cario",
            name :"ahmed",
            paymentId:charge.id,
            orderPrice:req.user.cart.totalPrice


        });

        order1.save((err,resulat)=>{
            if(err){
                console.log(err);
            }

            console.log(resulat)
            Cart.deleteOne({_id :req.user.cart._id},(err,doc)=>{
                if(err){
                    console.log(err)
                }
    
                console.log(doc);
                res.redirect("/")
    
            })
        })
      
         // If no error occurs 
    }) 
    .catch((err) => { 
        console.log(err)
       req.flash('error',err) 
       res.redirect("/profile")   // If some error occurs 
    }); 
}






module.exports={
    PostChe
}