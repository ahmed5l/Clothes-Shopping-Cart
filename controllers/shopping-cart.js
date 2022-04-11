const cartModel = require("../model/cart.model");
const Cart=require("../model/cart.model")
const PUBLISHABLE_KEY="pk_test_51JylQHEnTWYohCMYQgwI9ANhQgugvqkEv10OARsycNkpi5ZDiOMo5CoYwReXlybcXejuwbMTby1KJTRKrsKEufVz00FVtu2MEa"
const SECRET_KEY="sk_test_51JylQHEnTWYohCMY1miBjWraKTVMUG35UWTzoBaYUXI7kckCV13T2BqKVyaHxpdT80H6O5myH2KpRrs8o0VvUx6Y00mXZQ3bBV"



const showShoppingCart=(req,res)=>{

    
    if(!req.isAuthenticated()){
        res.redirect('login')
        return;
    } 
       if(! req.user.cart){
        res.render('pages/shoppingCart.ejs',
        {
            title:"shoppingCart",
            checkUser:true,
            userCart:false,
            totalProduct:null,
            hasCart:req.session.hasCart,
            key:PUBLISHABLE_KEY
        })

        req.session.hasCart=false;
        return
       }

       const userCart=req.user.cart;
       const totalProduct=req.user.cart.totalquantity;
    res.render('pages/shoppingCart.ejs',
    {
        title:"shoppingCart",
        checkUser:true,
        userCart:userCart,
        totalProduct:totalProduct,
        hasCart:req.session.hasCart,
        key:PUBLISHABLE_KEY
    })
}


const addToCart=(req,res)=>{
    req.session.hasCart=true
    const cartID=req.user._id

    const newPrice=parseInt(req.params.price,10)
    const newProduct={
        _id:req.params.id,
        price:newPrice,
        name:req.params.productName,
        quantity:1
    }

    Cart.findById(cartID).then(cart=>{
        if(! cart) {
            const newcart=new Cart({
                _id:cartID,
                totalquantity:1,
                totalPrice:newPrice,
                selectesProduct:[newProduct],
                createAt :Date.now()

            })
            newcart.save().then(doc=>{
                console.log(doc)
            })
            .catch(err=>console.log(err))
        }

        if(cart){
            let indexOfProduct=-1;
            cart.selectesProduct.forEach((element,index) => {
                if(req.params.id === element._id){
                    indexOfProduct =index;
                     return false;

                }

                
            });

            if(indexOfProduct >=0){
                cart.selectesProduct[indexOfProduct].quantity += 1;
                cart.selectesProduct[indexOfProduct].price +=newPrice;
                cart.totalquantity +=1;
                cart.totalPrice +=newPrice;
                cart.createAt=Date.now();

                Cart.updateOne({_id :cartID} ,{$set :cart}).then(doc=>{console.log(doc)}).catch(err => console.log(err))

            }

            else{
                cart.totalquantity +=1;
                cart.totalPrice +=newPrice;
                cart.selectesProduct.push(newProduct);
                cart.createAt=Date.now();
                Cart.updateOne({_id :cartID} ,{$set :cart}).then(doc=>{console.log(doc)}).catch(err => console.log(err))


            }


        }


    }).catch(err=>console.log(err))

    res.redirect("/")
}


const increaseProduct=(req,res)=>{
    if(req.user.cart){
        const index=req.params.index;
        const userCart=req.user.cart;
        const productPrice=userCart.selectesProduct[index].price/userCart.selectesProduct[index].quantity;
        userCart.selectesProduct[index].quantity +=1;
        userCart.selectesProduct[index].price +=productPrice;
        userCart.totalquantity +=1;
        userCart.totalPrice +=productPrice;
        userCart.createAt=Date.now();


        Cart.updateOne({_id:userCart._id},{$set:userCart}).then(doc=>{
            res.redirect("/shoppingCart")
        })
        .catch(err=>{throw new Error(err)})



    }

    else{
        res.redirect("/shoppingCart")
    }
}

const decreaseProduct=(req,res)=>{
    if(req.user.cart){
        const index=req.params.index;
        const userCart=req.user.cart;
        const productPrice=userCart.selectesProduct[index].price/userCart.selectesProduct[index].quantity;
        userCart.selectesProduct[index].quantity -=1;
        userCart.selectesProduct[index].price -=productPrice;
        userCart.totalquantity -=1;
        userCart.totalPrice -=productPrice;
        userCart.createAt=Date.now();


        Cart.updateOne({_id:userCart._id},{$set:userCart}).then(doc=>{
            res.redirect("/shoppingCart")
        })
        .catch(err=>{ throw new Error(err)})



    }

    else{
        res.redirect("/shoppingCart")
    }
}

  const deleteProduct=(req,res)=>{
      if(req.user.cart){

        const index=req.params.index;
        const userCart=req.user.cart;

        if(userCart.selectesProduct.length <= 1){
            Cart.deleteOne({_id :userCart._id }).then(doc =>{
                res.redirect("/shoppingCart")
            })
        }
        else{
            userCart.totalPrice -=userCart.selectesProduct[index].price;
            userCart.totalquantity=userCart.selectesProduct[index].quantity;
            userCart.selectesProduct.splice(index,1);
            userCart.createAt=Date.now();
            Cart.updateOne({_id :userCart._id},{$set:userCart})
            .then(doc=>{
                res.redirect("/shoppingCart")
            })
        }

      }

      else{
          res.redirect("/shoppingCart")
      }
  }


module.exports={showShoppingCart,addToCart,increaseProduct,decreaseProduct,deleteProduct}