const express = require('express');
const {
    getAllUsers,
    getSignup,
    getSignin,
    getBasket,
    getCheckout,
    getConfirm,
    postCreateOrder,
    signup,
    signin,
    getProfile,
} = require('../controllers/userController');


const router = express.Router();

router.get('/register', getSignup);
router.get('/login', getSignin);
router.post('/register', signup);
router.post('/login', signin);

router.get('/profile', getProfile);
router.get('/cart', getBasket);
router.post('/createOrder', postCreateOrder);

router.get('/checkout', getCheckout);
router.get('/confirm', getConfirm);

router.get('/logout', function(req, res, next) {
    if (!req.session.loggedIn) return res.redirect('/')
    req.session.destroy();
    return res.redirect('/')
});

module.exports = {
    routes: router
}