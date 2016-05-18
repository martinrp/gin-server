'use strict';

import express from 'express';
import { authenticate } from '../../utils/auth';

let router = express.Router();

function loginUser (req, res){
  
  authenticate(req.body.username, req.body.password, function(err, success, user){ 
    if (err){ 
      req.session.error = `Auth service error`;
      console.log('Auth service errors', err);
      res.redirect('/');
    } else if (success) { 
      // Regenerate session when signing in 
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key 
        // in the session store to be retrieved,
        // or in this case the entire user object 
        console.log('success - req', req.body);
        req.session.user = user;
        res.redirect('/user/' + user.username);
      }); 
    } else {
      req.session.error = `Authentication failed, please check your username and password.`;
      console.log('no autenticado', req.session);
      res.redirect('/');
    } 
  }); 
}

router.post('/login', (req, res) => loginUser(req, res));

export default router;