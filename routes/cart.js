// routes/cart.js
const express = require('express');
const router = express.Router(); //mini instance
const { isloggedIn } = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');

// Route to see the cart
router.get('/user/cart', isloggedIn, async (req, res) => {
    try {
        let user = await User.findById(req.user._id).populate('cart');
        res.render('cart/cart', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Add product to the cart
router.post('/user/:productId/add', isloggedIn, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;
        const product = await Product.findById(productId);
        const user = await User.findById(userId);
        user.cart.push(product);
        await user.save();
        res.redirect('/user/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete product from the cart
router.delete('/user/:productId/delete', isloggedIn, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;
        const user = await User.findById(userId);
        // Remove the product from the cart array
        user.cart = user.cart.filter(item => item.toString() !== productId);
        await user.save();
        res.redirect('/user/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
