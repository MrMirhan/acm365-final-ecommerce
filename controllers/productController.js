let Product = require('../data/products.json');
let Category = require('../data/categories.json');
let User = require('../data/users.json');
const fs = require('fs');

const getAllProducts = async(req, res, next) => {
    const list = Product
    return list
}

const getProduct = async(req, res, next) => {
    const category_name = req.params.category_name;
    const product_name = req.params.product_name;
    let product = Product.find(p => p.categoryRoute == category_name && p.routeUrl === product_name);
    if (!product) return res.redirect('/');
    let recommended = Product.filter(p => p.category_name === category_name)[0, 2];
    res.render('product/index', { session: req.session, page: { title: product.name }, product: product, recommended: recommended });
}

const productAddCart = async(req, res, next) => {
    if (!req.session.loggedIn) return res.redirect('/login')
    const category_name = req.params.category_name;
    const product_name = req.params.product_name;
    let product = Product.find(p => p.categoryRoute == category_name && p.routeUrl === product_name);
    if (!product) return res.redirect('/');
    if (!req.session.basket) req.session.basket = [];
    req.session.basket.push(product);
    // find user and add product to basket
    let user = User.find(u => u.email === req.session.user.email);
    user.basket.push(product);
    // save user json
    fs.writeFileSync('./data/users.json', JSON.stringify(User, null, 2));
    res.redirect('/cart');
}

const getCategoryProducts = async(req, res, next) => {
    const category_name = req.params.category_name;
    let category = Category.find(c => c.route == category_name);
    let products = Product.filter(p => p.categoryRoute == category_name);
    if (!products) return res.redirect('/');
    res.render('product/category', { session: req.session, page: { title: category.name }, products: products });
}

module.exports = {
    getAllProducts,
    getProduct,
    getCategoryProducts,
    productAddCart
}