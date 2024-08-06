const express= require('express');
const router= express.Router();
const Product = require('../models/Product');
const Review=require('../models/Reviews')
const {validatereview}=require('../middleware');

    router.post('/products/:id/review',validatereview,async (req,res)=>{
    try {
        let{rating, comment}=req.body;
        let {id}=req.params;
        let product= await Product.findById(id)
        let review=new Review({rating,comment})
        product.reviews.push(review);
        await product.save();
        await review.save();
        req.flash('success',"review saved successfully");
        res.redirect(`/products/${id}`)
    } catch (error) {
        res.status(500).redirect('error',{err:error.message})
    }
    
      
    
   

})




module.exports=router;