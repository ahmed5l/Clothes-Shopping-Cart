const router=require('express').Router();
const shoppingController=require("../controllers/shopping-cart")
router.get("/" ,shoppingController.showShoppingCart)
router.get('/:id/:price/:productName',shoppingController.addToCart)
router.get("/increaseProduct/:index",shoppingController.increaseProduct)
router.get("/decreaseProduct/:index",shoppingController.decreaseProduct)
router.get("/deleteProduct/:index",shoppingController.deleteProduct)

module.exports=router;