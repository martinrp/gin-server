'use strict';

import express from 'express';
import UserLang from '../../utils/user-language';
import User from './model';
import Game from '../game';

let router = express.Router();

function handleGet(req, res){
  res.locals = {
    title: 'Welcome ' + req.user.username,
    username: req.user.username
  }

  res.render(__dirname + '/index');
}


function restrict(req, res, next) { 
  
  if (req.session && req.session.user) {
    // console.log('req session', req, req.session); 
    next(); 
  } else {
    req.session.error = 'Access denied!'; 
    console.log(req.session.error);
    res.redirect('/'); 
  } 
}

router.use( (req, res, next) => restrict(req, res, next) );

// Use game as a subroute
router.use( '/:user/game', Game );

router.param('user', function(req, res, next, username) {

  // try to get the user details from the User model and attach it to the request object
  req.user = username;

  // TODO: Turn into a function in the model
  console.log('Searching for user ' + username);
  User.find({ username: username }, function(err, user) {
    if (err) {
      next(err);
    } else if (user.length > 0) {
      req.user = user[0];
      console.log('User found', req.user.username);
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});

router.get( '/:user', (req, res) => handleGet(req, res) );



router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.redirect('/');
});


// router.post( '/', (req, res) => ProcReq.processPost(req, res, ServerUtils.resComplete) );

export default router;