const user = require('../data/users.json');
const fs = require('fs');

const getAllUsers = async(req, res, next) => {
    const list = user.map(user => {
        return {
            name: user.name,
            email: user.email,
            phonenumber: user.phonenumber,
            basket: user.basket,
            orders: user.orders
        }
    })
    return list
}

const getSignup = (req, res, next) => {
    if (req.session.loggedIn) return res.redirect('/')
    res.render('auth/signup', { page: { 'title': 'Register' }, session: req.session });
}

const signup = async(req, res, next) => {
    if (req.session.loggedIn) return res.redirect('/')
    const { name, password, email, phonenumber } = req.body;

    for (const param of['name', 'email', 'password', 'phonenumber']) {
        if (!Object.keys(req.body).includes(param)) return res.redirect('/register');
    }

    const userCheck = user.find(user => user.email == email || user.name == name);

    if (userCheck) return res.redirect('/register');
    try {
        // add user to user json
        user.push({ name: name, password: password, email: email, phonenumber: phonenumber, orders: [], basket: [] });
        // save user json
        fs.writeFileSync('./data/users.json', JSON.stringify(user, null, 2));

        req.session.loggedIn = true
        req.session.user = req.body;
        res.redirect('/');
    } catch (e) {
        console.error(e)
        return res.redirect('/register')
    }
}

const getSignin = (req, res, next) => {
    if (req.session.loggedIn == true) return res.redirect('/')
    res.render('auth/signin', { page: { 'title': 'Login' }, session: req.session });
}

const signin = async(req, res, next) => {
    if (req.session.loggedIn == true) return res.redirect('/')
    const data = req.body;
    for (const param of['name', 'password']) {
        if (!Object.keys(data).includes(param)) return res.redirect('/login');
    }
    const checkUser = user.find(u => u.name == data.name && u.password == data.password);
    if (!checkUser) {
        return res.redirect('/login')
    }
    req.session.loggedIn = true
    req.session.user = checkUser;
    res.redirect('/profile')
}

const getProfile = async(req, res, next) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect('/login')
        }
        const cUser = user.find(u => u.name == req.session.user.name);
        res.render('profile/index', { page: { title: 'Profile' }, user: cUser, session: req.session });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBasket = (req, res, next) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect('/login')
        }
        const cUser = user.find(u => u.name == req.session.user.name);

        res.render('order/cart', { page: { title: 'Cart' }, user: cUser, session: req.session });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const postCreateOrder = (req, res, next) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect('/login')
        }
        const cUser = user.find(u => u.name == req.session.user.name);
        const { firstname, lastname, email, phonenumber, add1, add2, city, zip, country, message } = req.body;
        const order = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phonenumber: phonenumber,
            address1: add1,
            address2: add2,
            city: city,
            zip: zip,
            country: country,
            message: message,
            items: cUser.basket
        }
        cUser.orders.push(order);
        cUser.basket = [];
        req.session.user = cUser;
        fs.writeFileSync('./data/users.json', JSON.stringify(user, null, 2));
        res.redirect('/confirm')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCheckout = (req, res, next) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect('/login')
        }
        const cUser = user.find(u => u.name == req.session.user.name);

        res.render('order/checkout', { page: { title: 'Checkout' }, user: cUser, session: req.session });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getConfirm = (req, res, next) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect('/login')
        }
        const cUser = user.find(u => u.name == req.session.user.name);

        res.render('order/confirm', { page: { title: 'Order Confirmation' }, user: cUser, session: req.session });
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
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
}