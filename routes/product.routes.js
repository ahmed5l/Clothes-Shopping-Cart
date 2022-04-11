const router=require('express').Router();
const productController=require('../controllers/product.controller')
const guard=require("../guard/auth.guard")
router.get("/",guard.isSellerNotLogin,guard.isSeller,productController.addproduct)
router.post("/" ,guard.isSellerNotLogin,guard.isSeller,productController.upload.single('myfile'),productController.eventAddProduct)
router.get("/:id",guard.isSellerNotLogin,productController.getproduct)



module.exports=router