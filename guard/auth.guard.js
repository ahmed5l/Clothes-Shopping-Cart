exports.logOut=(req,res)=>{
    req.logOut();
    res.redirect('/')
}

 exports.isSignIn=(req,res,next)=>{
    if(! req.isAuthenticated()){
        res.redirect('login');
        return;
    }
    next();

}



exports.isAdmin=(req,res,next)=>{
    if(! req.isAuthenticated() ){
        res.redirect('login/admin');
        return;
    }else if (req.user.isAdmin) next();
  
       else {
           console.log("aa")
    res.redirect('/login/admin');
       return;}

     
}

exports.isAdminIn=(req,res,next)=>{
    if(  req.isAuthenticated() && req.user.isAdmin){
        res.redirect('/admin');
        return;
    }
    next();
}

exports.isSellerIn=(req,res,next)=>{
    if(    req.isAuthenticated()  &&  req.user.isSeller){
        res.redirect('/seller');
        return;
    }
    next();

}


exports.isSellerNotLogin=(req,res,next)=>{
    if(  !req.isAuthenticated()){
        res.redirect('/loginSeller');
        return;
    }
    next();

}

exports.isSeller=(req,res,next)=>{
    if(  req.isAuthenticated()  && !req.user.isSeller){
        res.redirect('loginSeller');
        return;
    }
    next();

}



exports.isNotSignIn=(req,res,next)=>{
    if( req.isAuthenticated()){
        res.redirect('/');
        return;
    }
    next();
}




