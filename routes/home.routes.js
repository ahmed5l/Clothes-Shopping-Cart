const router=require('express').Router();
const homeController=require("../controllers/home.controller")
router.get("/",homeController.showHome)
router.post('/search',homeController.search)
module.exports=router