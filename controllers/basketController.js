const addBasketUser = async(req, res, next) => {
    const data = req.body;
    let user = await User.findById(req.session.user._id);
    if (!user) return res.status(404).send('User with the given id not found');
    let product = await Product.findById(data.product_id);
    user.basket.push(product);
    let userUpdate = await User.findByIdAndUpdate(req.session.user._id, user, { new: true });
    if (!userUpdate) return res.status(404).send('User with the given id not found');
    res.json(user)
}

const deleteBasketUser = async(req, res, next) => {
    const data = req.body;
    let user = await User.findById(data.user._id);
    if (!user) return res.status(404).send('User with the given id not found');
    let basket = data.product;
    user.basket.pull(basket);
    let userUpdate = await User.findByIdAndUpdate(req.session.user._id, user, { new: true });
    if (!userUpdate) return res.status(404).send('User with the given id not found');
    res.json(user)
}

module.exports = {
    addBasketUser,
    deleteBasketUser
}