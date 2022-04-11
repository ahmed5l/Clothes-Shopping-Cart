const router=require('express').Router();
const authController=require('../controllers/auth.controller')
const  guard=require('../guard/auth.guard')
const validAuth=require('../middleware/valid')
const passAuth=require('../middleware/pass')


router.get('/signup',guard.isNotSignIn,authController.showSingUpPage)
router.post('/signup',validAuth.validateUser,passAuth.eventSignUp)

router.get('/login',guard.isNotSignIn,authController.showSignIn);
router.post('/login',validAuth.validateUserLogin,passAuth.eventLogin)

router.get("/logout",guard.logOut)


router.get('/login/admin',guard.isAdminIn,authController.showSignInAdmin);
router.post('/login/admin',validAuth.validateUserLogin,passAuth.eventLoginAdmin)




router.get('/loginSeller',guard.isSellerIn,authController.showSignInSeller);
router.post('/loginSeller',guard.isSellerIn,validAuth.validateSellerLogin,passAuth.eventLoginSeller)



module.exports=router;


















































 








