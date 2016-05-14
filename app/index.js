'use strict';

import express from 'express';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import hbs from 'hbs';
import bodyParser from 'body-parser';
import session from 'express-session';

import home from './modules/home';
import user from './modules/user';
import login from './modules/login';

const PORT = 8000;
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
// hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'somethingsecret',
    resave: true,
    saveUninitialized: true,
    httpOnly: true,
    secure: false
}));
app.use(csurf({ cookie: true }));


app.listen(PORT, function () {
  console.log('Server listening on port %s', PORT);
});

// Routing
// '/' Home route
app.use(home);
// '/user/:{user}' User route
app.use('/user', user);
// '/login' - POST only
app.use('/', login);

export default app;