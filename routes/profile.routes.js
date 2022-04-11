const router=require('express').Router();
const profileController=require('../controllers/profile.controller');
const guard=require('../guard/auth.guard')


router.get("/",guard.isSignIn,profileController.showProfile)
router.post("/updateUser",profileController.upload.single('myfile'),profileController.updateUser)
module.exports=router