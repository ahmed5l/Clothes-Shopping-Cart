



//////////Start SignUp /////////////
const showSingUpPage=(req,res)=>{

    let massageError=req.flash('signupError')
    res.render('pages/signup.ejs',{
        massages:massageError,
        title:'singUpPage',
        checkUser:false,
        
    })

}



//////////////End SignUp////////////////
/////////////Start SignIn ///////////////

const showSignIn=(req,res)=>{
    let massageError=req.flash('loginError')
    res.render('pages/login.ejs',{
        title :'Login',
        massages :massageError,
        checkUser:false
    })
}

const showSignInAdmin=(req,res)=>{

    let massageError=req.flash('loginError')

    console.log(massageError)
    res.render('pages/loginAdmin.ejs',{
        title :'LoginAdmin',
        massages :massageError,
        checkUser:false
    })
}

const showSignInSeller=(req,res)=>{
    let massageError=req.flash('signInSellerError')
    res.render('pages/sellerLogin.ejs',{
        massages :massageError,
        title :'LoginSeller',
           checkUser:false
    })
}



module.exports={
    showSingUpPage,
    showSignIn,
    showSignInAdmin,
    showSignInSeller
    
    
}