const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsmate = require('ejs-mate')
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const User = require('./models/User');
const LocalStrategy = require('passport-local');
const passport = require('passport')

const productroutes = require('./routes/product');
const reviewroutes = require('./routes/review');
const userroutes = require('./routes/user');
const cartroutes = require('./routes/cart');
const paymentroutes = require('./routes/payment'); // Add this line to import payment routes

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mycars')
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("db error");
  });

// Session configuration
let configSession = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
}

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsmate);
app.use(flash());
app.use(session(configSession));
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy setup
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// Custom middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes setup
app.use(productroutes);
app.use(reviewroutes);
app.use(userroutes);
app.use(cartroutes);
app.use(paymentroutes); // Use payment routes

const port = 8080;

// Server start
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
