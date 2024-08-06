const express = require('express');
const app = express();
const session = require('express-session');

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true }
}));

app.get('/viewcount', (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(req.session.count.toString()); // Convert to string before sending
});
app.get('/setname',(req,res)=>{
    req.session.username="surya";
    res.redirect('/name')
    
})
app.get('/name',(req,res)=>{
   let{username="chodu"}=req.session;
   res.send(`hii my name is ${username}`);
})

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
