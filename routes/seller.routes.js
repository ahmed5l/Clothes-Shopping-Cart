const router=require('express').Router();
const sellerController=require("../controllers/seller.controller");
const guard=require("../guard/auth.guard")
const authValid=require('../middleware/valid')

router.get("/",guard.isSignIn,sellerController.showSellerPage)
router.get("/products",guard.isSignIn,sellerController.products)
router.get("/showUpdateProduct/:id",guard.isSellerNotLogin,sellerController.showupdateProduct)
router.post("/updateProduct/:id",guard.isSignIn,sellerController.upload.single("myfile"),sellerController.updateProduct)

 module.exports=router