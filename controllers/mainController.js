const banners = require('../data/banners.json')
const products = require('../data/products.json')
const categories = require('../data/categories.json')
const clients = require('../data/clients.json')


const mainPage = (req, res, next) => {
    return res.render('main/index', { page: { title: "Home" }, products: products, banners: banners, categories: categories, clients: clients, session: req.session });
}

module.exports = {
    mainPage
}