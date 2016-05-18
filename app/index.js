'use strict';

import express from 'express';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';

import home from './modules/home';
import user from './modules/user';
import game from './modules/game';
import login from './modules/login';

import hbs from 'hbs';

const PORT = 8000;
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
// hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let seshConfig = {
    secret: 'secretsquirrel',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}

if (app.get('env') !== 'development'){
    app.use(csurf({ cookie: true }));
    seshConfig = {
        secret: 'secretsquirrel',
        resave: true,
        saveUninitialized: true,
        httpOnly: true,
        secure: false,
        cookie: { maxAge: 60000 }
    }
}

app.use(session(seshConfig));

mongoose.connect('mongodb://martin:ginrummy@ds023442.mlab.com:23442/gin-server', function (error) {
    if (error) { console.log(error); }
    else { console.log('mongo connected to MLab'); }
});

app.listen(PORT, function () {
  console.log('Server listening on port %s', PORT);
});

// Routing
// '/' Home route
app.use(home);
// '/user/:user' User route
app.use('/user', user);
app.use('/user/:user/game', game);
// '/login' - POST only
app.use('/', login);

export default app;