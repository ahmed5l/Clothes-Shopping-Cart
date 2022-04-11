const passport=require('passport'),
      loaclStratery=require('passport-local').Strategy,
       User=require('../model/users.model');
       Cart=require('../model/cart.model')




passport.serializeUser((user,done)=>{
    return done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
    Cart.findById(id,(err,cart)=>{
        if(!cart){
            return done(err,user)
        }
        user.cart=cart;
        return done(err,user)

    })   
    })
})



passport.use('local-signin',new loaclStratery({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({email:email},(error,user)=>{
        if(error){
            return done(err)
        }
        if(! user){
            return done(null,false,req.flash('loginError','User not found'))
        }
        if(! user.comparePassword(password)){
            return done(null,false,req.flash('loginError' ,'Password Not match'))
        }

        return(done(null ,user))

    })

}
))  

passport.use('local-signinSeller',new loaclStratery({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({email:email},(error,seller)=>{
        if(error){
            return done(err)
        }
        if(! seller){
            return done(null,false,req.flash('signInSellerError','User not found'))
        }
        if(! seller.comparePassword(password)){
            return done(null,false,req.flash('signInSellerError' ,'Password Not match'))
        }

        if(! seller.isSeller){
            return done(null,false,req.flash('signInSellerError' ,'Is Not Seller'))

        }

        return(done(null ,seller))

    })

}
)) 
passport.use('local-signinAdmin',new loaclStratery({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},  (req,email,password,done)=>{
    User.findOne({email:email}, (error,admin)=>{
        if(error){
            return  done(err)
        }
        if(! admin){
            return  done(null,false,req.flash('loginError','User not found5'))
        }
        if(! admin.comparePassword(password)){
            return  done(null,false,req.flash('loginError' ,'Password Not match55'))
        }
        if(! admin.isAdmin){
            
            return  done(null,false,req.flash('loginError' ,'Not admin'))

                
        }


        return( done(null ,admin))

    })

}
))  

passport.use('local-signup',new loaclStratery({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({email:email},(err,user)=>{
        if(err){
            return  done(err)
        }
        if(user){
            return done(null,false,req.flash('signupError','This Already Exist '))
        }
        const newuser=new User({
            email:email,
            password:new User().hashPassword(password)
        })
        newuser.save((err,user)=>{
            if(err){
                return done(err)
            }
            return done(null,user)
        })

    })
}))



passport.use('local-signupSeller',new loaclStratery({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({email:email},(err,seller)=>{
        if(err){
            return  done(err)
        }
        if(seller){
            return done(null,false,req.flash('signupSellerError','This Already Exist '))
        }
        const newSeller=new User({
            username:req.body.brandName,
            email:email,
            password:new User().hashPassword(password),
            isSeller:true,
            
        })
        newSeller.save((err,user)=>{
            if(err){
                return done(err)
            }
            return done(null,seller)
        })

    })
}))