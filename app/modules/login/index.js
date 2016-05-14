'use strict';

import express from 'express';
import { authenticate } from '../../utils/auth';

let router = express.Router();

function _loginUser (req, res){
  console.log('req', req.body);
  authenticate(req.body.username, req.body.password, function(err, success, user){ 
    console.log('authenticate', success, user);
    if (success) { 
      
      // Regenerate session when signing in 
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key 
        // in the session store to be retrieved,
        // or in this case the entire user object 
        req.session.user = user;
        res.redirect('/' + user.name);
      }); 
    } else {
      console.log('no autenticado')
      // req.session.error = `Authentication failed, please check your username and password.`; 
      res.redirect('/');
    } 
  }); 
}

router.post('/login', (req, res) => _loginUser(req, res));

export default router;