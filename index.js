const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./startup/config');
const winston = require('winston');

var expressSession = require('express-session')

const err = require('./middleware/errors');
const userRoutes = require('./routes/user-routes');
const mainRoutes = require('./routes/main-routes');
//const basketRoutes = require('./routes/basket-routes');
const productRoutes = require('./routes/product-routes');

const user = require('./data/users.json');

const app = express();

require('./startup/logging')();

app.set('trust proxy', 1)


app.use(expressSession({
    secret: 'x159951A!',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 }
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

var refreshSession = async function(req, res, next) {
    if (req.session.loggedIn) {
        let cUser = user.find(u => u.email === req.session.user.email);
        req.session.user = cUser;
        req.session.nowInMinutes = Math.floor(Date.now() / 60e3) // new 
    }
    next();
}

app.use(refreshSession);
app.use(userRoutes.routes);
app.use(mainRoutes.routes);
//app.use(basketRoutes.routes);
app.use(productRoutes.routes);
app.use(err);


app.listen(config.port, () => winston.info('App is listening on url http://localhost:' + config.port));