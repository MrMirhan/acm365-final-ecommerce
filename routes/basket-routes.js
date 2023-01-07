const express = require('express');

const { addBasketUser, deleteBasketUser } = require('../controllers/basketController');

const router = express.Router();

router.post('/basket/add', addBasketUser);
router.post('/basket/delete', deleteBasketUser);

module.exports = {
    routes: router
}