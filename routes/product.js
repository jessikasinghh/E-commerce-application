const express = require("express");
const Product = require("../models/Product");
const Review = require("../models/Reviews");
const router = express.Router();
const {validateproduct,validatereview,isloggedIn,isSeller,isAuthorized}=require('../middleware.js');


router.get("/products", async (req, res) => {
    try {
      const products = await Product.find({});
    res.render("products/index", { products });
    } catch (error) {
      res.status(500).render('products/error', { err: error.message });

    }
});

  router.get("/product/new",isloggedIn,(req, res) => {
    try {
      res.render("products/new");
    } catch (error) {
      res.status(500).render('products/error', { err: error.message });

    }
    
  

});
router.post("/products",validateproduct,isloggedIn,isSeller,async(req,res) => {
    try {
      let { name, img, price, desc } = req.body;
      await Product.create({ name, img, price, desc ,author:req.user._id});
      req.flash('success',"product added successfully");
      res.redirect("/products");
    } catch (error) {
      res.status(500).render('error', { err: error.message });

    }
      
    
  });
  

  router.get("/products/:id",isloggedIn, async (req, res) => {
    try {
      let { id } = req.params;
    const findproduct = await Product.findById(id).populate("reviews");
    res.render("products/show", {findproduct});
    } catch (error) {
      res.status(500).render('error', { err: error.message });

    }
    


  
});

  router.get("/products/:id/edit",isloggedIn,isSeller, async (req, res) => {
    try {
      let { id } = req.params;
      const findproduct = await Product.findById(id);
      res.render("products/edit", { findproduct });
    } catch (error) {
      res.status(500).render('error', { err: error.message });

    }
   


});

  router.patch("/products/:id",validateproduct,isSeller, async (req, res) => {
    try {
      let { name, img, price, desc } = req.body;
    let { id } = req.params;
    await Product.findByIdAndUpdate(id, { name, img, price, desc });
    req.flash('success',"product edited successfully")
    res.redirect(`/products/${id}`);
    } catch (error) {
      res.status(500).render('error', { err: error.message });

    }
    
  
});

  router.delete("/products/:id",isloggedIn,isSeller,isAuthorized, async (req, res) => {
    try {
      let { id } = req.params;
    const product = await Product.findById(id);
    // for(let id of product.reviews){
    //    await Review.findByIdAndDelete(id);
    // }
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
    } catch (error) {
      res.status(500).render('error', { err: error.message });

    }
    
  })
  


module.exports = router;
