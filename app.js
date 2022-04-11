
require('dotenv').config();
const express = require("express"),
      app=express(),
      expressLayout=require('express-ejs-layouts'),
      mongoose=require('mongoose'),
      session=require('express-session'),
      sessionStore=require('connect-mongodb-session')(session),
      flash=require('connect-flash'),
      passport=require("passport"),
      homeRouter=require("./routes/home.routes"),
      profileRouter=require("./routes/profile.routes"),
      productRouter=require("./routes/product.routes"),
      cartRouter=require("./routes/cart.routes"),
      orderRouter=require("./routes/order.routes"),
      adminRouter=require("./routes/admin.routes"),
      sellerRouter=require('./routes/seller.routes'),
      shoppingCartRouter=require('./routes/shopping-cart.routes')

      BD_URL=process.env.DB,
      port=process.env.PORT;

      require('./config/passport')
    //session
    const STORE=new sessionStore({
        uri:BD_URL,
        collection:'session'
    })

    app.use(session({
        secret:'this is my secret to hash express sessions......',
        saveUninitialized:false,
        store:STORE
    }))
    app.use(flash())
    app.use(passport.initialize());
    app.use(passport.session());

    //views engine
   app.use(express.static(__dirname+"/public"));
   app.set('view engine','ejs');
   app.use(expressLayout)

   //connection database
   mongoose.connect(BD_URL);
   const db=mongoose.connection;
   db.on('open',()=>{console.log("connection success")});
   db.once('error',()=>console.log("connection faild"));
  // app.use('/upload',express.static('upload'))

   app.use(express.urlencoded({ extended: false }));
  

   //middleWare Routers
   app.use(require('./routes/home.routes'));
   app.use(require('./routes/auth.routes'))
   
   app.use("/product",productRouter);
   app.use("/profile",profileRouter);
   app.use("/cart",cartRouter);
   app.use("/order",orderRouter);
   app.use('/admin',adminRouter);
   app.use('/seller',sellerRouter);
   app.use("/shoppingCart",shoppingCartRouter);
   app.use(require('./routes/404.routes'))
  ////404 route
  /*
  app.use((req,res)=>{
   res.redirect("/404")
  })
*/
    //servert
   app.listen(port,()=>{
       console.log(`succes${port}`)
   })   

