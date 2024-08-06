const Joi = require('joi');

const productschema = Joi.object({
    name: Joi.string().required(),
    img:Joi.string().required(),
    price:Joi.string().required().min(0),
    desc:Joi.string().required(),
})
const reviewschema = Joi.object({
    comment: Joi.string().required(),
    rating:Joi.string().required().min(0).max(5),
    
})
module.exports=productschema;
module.exports=reviewschema;