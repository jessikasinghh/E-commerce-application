const express=require('express');
const User = require('../models/User');//those methods which can direcltly on schema/model they are static methods
const router=express.Router();
const passport=require('passport');

router.get('/register',(req,res)=>{
    res.render('auth/register')
})
router.post('/register',async(req,res)=>{
    try {
    let{username, email, password,role}=req.body;
    const user=new User({email,username,role});
   const newUser =await User.register(user, password);// it is a static method directly apply on the schema
   req.login(newUser,function(err) {
        if(err){return next(err)}
        req.flash("success","welcome, you are registered")
        // console.log(req.user);
        return res.redirect('/products')
    })
   } catch (error) {
    req.flash('error',error.message);
    res.redirect('/register');
   } 
   
})
// login routes
router.get('/login',(req,res)=>{
    res.render('auth/login');
})
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log(req.user);
    req.flash("success","Welcome back");
    return res.redirect('products');
  });
  
  router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash("success","please visit us again")
      res.redirect('/login');
    });
  });
module.exports=router;