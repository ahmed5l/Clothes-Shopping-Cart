const {check, validationResult} = require('express-validator');

exports.validateUser = [
    
    check('email').not().isEmpty().withMessage('please your Email'),
    check('email').isEmail().withMessage("Please Enter Email"),
    check('password').not().isEmpty().withMessage("please enter password"),
    check("password").isLength({ min: 5 }).withMessage("please enter password more then 5 c"),
    check('confirm-password').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('password not matched')
  
      }
      return true;
  
    }),
  (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //console.log(errors.errors);
      let validationMassages = [];
      for (let i = 0; i < errors.errors.length; i++) {
        validationMassages.push(errors.errors[i])
       // console.log(validationMassages[0])
      }
      req.flash('signupError', validationMassages);
      
     // res.redirect('signup')
    
    }
    next()
      
  }
];


exports.validateUserLogin=[check('email').not().isEmpty().withMessage("please Enter Your Email"),
check('email').isEmail().withMessage("please your email not email"),
check('password').not().isEmpty().withMessage("please your Password"),
check("password").isLength({ min: 5 }).withMessage("please enter password more then")
, (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let validationMassages = [];
    for (let i = 0; i < errors.errors.length; i++) {
      validationMassages.push(errors.errors[i])
    }
    req.flash('loginError', validationMassages);
    
   // res.redirect('signup')
  
  }
  next()
}]



exports.validateSellerLogin=[check('email').not().isEmpty().withMessage("please Enter Your"),
check('email').isEmail().withMessage("please your email not email"),
check('password').not().isEmpty().withMessage("please your Password"),
check("password").isLength({ min: 5 }).withMessage("please enter password more then")
, (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors.errors);
    let validationMassages = [];
    for (let i = 0; i < errors.errors.length; i++) {
      validationMassages.push(errors.errors[i])
     // console.log(validationMassages[0])
    }
    req.flash('loginError', validationMassages);
    
   // res.redirect('signup')
  
  }
 
  next()
}]
/*

exports.validateProduct=[check('name').not().isEmpty().withMessage("please Enter  NameProduct"),
check('shortdescription').not().isEmpty().withMessage("please Enter  shortdescription"),
check('description').not().isEmpty().withMessage("please Enter description"),
check('category').not().isEmpty().withMessage("please Enter category"),
check('price').not().isEmpty().withMessage("please Enter price"),
check('discount').not().isEmpty().withMessage("please Enter discount"),
check('myfile').not().isEmpty().withMessage("please Enter discount"),

, (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors.errors);
    let validationMassages = [];
    for (let i = 0; i < errors.errors.length; i++) {
      validationMassages.push(errors.errors[i])
     // console.log(validationMassages[0])
    }
    req.flash('productError', validationMassages);
    
   // res.redirect('signup')
  
  }
 
  next()
}]*/