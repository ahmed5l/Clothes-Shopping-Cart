const router=require('express').Router();
const orderController=require("../controllers/order.controller")

router.post('/',orderController.PostChe)

module.exports=router