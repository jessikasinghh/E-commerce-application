const mongoose=require('mongoose')
const Reviews=require('./Reviews')
const User=require('./User');
const productSchema=new mongoose.Schema({
name:{
    type:String,
    trim:true,
    required:true,
},
img:{
    type:String,
    trim:true,
    required:true,
},
price:{
    type:Number,
    trim:true,
    min:0,
    required:true,
},
desc:{
    type:String,
    trim:true,
    required:true,
},
reviews:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review"
   },
],
author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
},

})

// this is middleware of mongodb and they are used in betwen the scnes and is mein pre psot calls hoti hn jo ki 
//and used over the schema before the model js class 
productSchema.post('findOneAndDelete',async function (product){
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})
 

let Product=mongoose.model('Product',productSchema)//here makes the model of the mongoose
module.exports=Product