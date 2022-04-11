const router=require('express').Router();
const  adminContrller=require('../controllers/admin.controller')
const  guard=require('../guard/auth.guard')
const validAuth=require('../middleware/valid')
const passAuth=require('../middleware/pass')


router.get("/",guard.isAdmin,adminContrller.showAdmin);
router.get("/createSeller",guard.isAdmin,adminContrller.showCreateSeller)

router.post("/createSeller",guard.isAdmin,validAuth.validateUser,passAuth.createSeller)

module.exports=router