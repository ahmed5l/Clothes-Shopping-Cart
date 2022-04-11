const passport = require('passport');

 exports.eventSignUp=passport.authenticate('local-signup',{
    session:false,
    successRedirect:"login",
    failureRedirect:"signup",
    failureMessage:true
 })

 exports.eventLogin= passport.authenticate('local-signin', {
    successRedirect: "/",
    failureRedirect: "login",
    failureFlash: true
  })


  exports.eventLoginAdmin= passport.authenticate('local-signinAdmin', {
   successRedirect: "/admin",
   failureRedirect: "/login/admin",
   failureFlash: true
 })



 exports.createSeller=passport.authenticate('local-signupSeller',{
   session:false,
   successRedirect:"/admin",
   failureRedirect:"/admin/createSeller",
   failureMessage:true
})

exports.eventLoginSeller= passport.authenticate('local-signinSeller', {
   successRedirect: "/seller",
   failureRedirect: "loginSeller",
   failureFlash: true
 })

