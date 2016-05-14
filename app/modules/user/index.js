'use strict';

import express from 'express';
import UserLang from '../../utils/user-language';

let router = express.Router();

function _handleGet(req, res){
  res.locals = {
    title: 'Welcome ' + req.user,
    username: req.user
  }

  res.render(__dirname + '/index');
}


function _restrict(req, res, next) { 
  if (req.session && req.session.user) { 
    next(); 
  } else {
    req.session.error = 'Access denied!'; 
    res.redirect('/login'); 
  } 
}

router.use( (req, res, next) => _restrict(req, res, next) ); 

router.param('user', function(req, res, next, id) {

  // try to get the user details from the User model and attach it to the request object
  req.user = id;
  next();

  // User.find(id, function(err, user) {
  //   if (err) {
  //     next(err);
  //   } else if (user) {
  //     req.user = user;
  //     console.log('User', user);
  //     next();
  //   } else {
  //     next(new Error('failed to load user'));
  //   }
  // });
});

router.get( '/:user', (req, res) => _handleGet(req, res) );

// router.post( '/', (req, res) => ProcReq.processPost(req, res, ServerUtils.resComplete) );

export default router;