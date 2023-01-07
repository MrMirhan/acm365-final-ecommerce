const express = require('express');
const {
    getAllProducts,
    getProduct,
    getCategoryProducts,
    productAddCart
} = require('../controllers/productController');


const router = express.Router();

router.post('/api/product/all', getAllProducts);
router.get('/category/:category_name', getCategoryProducts);
router.get('/product/:category_name/:product_name', getProduct);
router.get('/product/:category_name/:product_name/addCart', productAddCart);

module.exports = {
    routes: router
}