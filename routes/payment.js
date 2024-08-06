const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_mBFX8C2tMB9Gwy',
    key_secret: 'Rp3c9F1KaG8zk5o8XANRv4rJ'
});

router.post('/createorder', async (req, res) => {
    try {
        const amount = req.body.amount * 100;
        const options = {
            amount: 10000000,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        };

        console.log('Creating order with options:', options);

        razorpayInstance.orders.create(options, (err, order) => {
            if (!err) {
                console.log('Order created successfully:', order);
                res.status(200).send({
                    success: true,
                    msg: 'Order Created',
                    order_id: order.id,
                    amount: 1000,
                    key_id: 'rzp_test_mBFX8C2tMB9Gwy', // Replace with your actual Razorpay key
                    product_name: "goodd",
                    description: "eveveveve",
                    contact: "8567345632",
                    name: "Jessika singh",
                    email: "sandeep@gmail.com"
                });
            } else {
                console.error('Error creating order:', err);
                res.status(400).send({ success: false, msg: 'Something went wrong!' });
            }
        });

    } catch (error) {
        console.error('Internal server error:', error.message);
        res.status(500).send({ success: false, msg: 'Internal server error' });
    }
});

module.exports = router;
