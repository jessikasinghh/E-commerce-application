const productschema=require('./schema');
const reviewschema=require('./schema');
const Product=require('./models/Product');

const validateproduct=(req,res,next)=>{
    const{name,img,price,desc}=req.body;
    const {error}=productschema.validate({name,img,price,desc});
    if(error){
        // return res.render('products/error');
    }
    next();
}
const validatereview=(req,res,next)=>{
    const{comment, rating}=req.body;
    const {error}=productschema.validate({comment, rating});
    if(error){
        // return res.render('products/error');
    }
    next();
}
const isloggedIn=(req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.flash('error',"Please login first");
        return res.redirect('/login')
       
    }
    next();
}
const isSeller = (req,res,next)=>{
    
    if(!req.user.role){
        // console.log(req.user.role);
        req.flash('error' , 'You donot have the permission to do that');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error' , 'You donot have the permission to do that');
        return res.redirect('/products');
    }
    next();
}
const isAuthorized=async(req,res,next)=>{
    let {id} = req.params; //product id
    let product = await Product.findById(id); //entire product
    if(!(req.user._id)){
        req.flash('error' , 'You are not the authorised user');
        return res.redirect('/products');
    }
next();
}
module.exports={validateproduct,validatereview,isloggedIn,isSeller,isAuthorized};
    


