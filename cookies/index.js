const express= require('express');
const app=express();
const cookieParser= require('cookie-parser');


app.use(cookieParser("secret_key"));



app.get('/',(req,res)=>{
    res.send("sab sahi h ")
})  
app.get('/cookie',(req,res)=>{
    res.cookie("i","smart",{signed:true});
    res.cookie("kesa","mast",{signed:true});
    res.cookie("thik","bhadiya");
    res.send("cookie aa gyi");
})





app.listen(3030,()=>{
    console.log("server is running at 8080");
})