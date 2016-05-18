'use strict';

import express from 'express';
import select from '../../helpers/select';

let router = express.Router({mergeParams: true});

function handleGame(req, res){
  res.locals = {
    title: 'New Game',
    username: req.user.username,
    users: [
      {username: "Player1"},
      {username: "Player2"}
    ]
  }
  console.log('handle game');
  res.render(__dirname + '/index');
}

router.get( '/', (req, res) => handleGame(req, res) );

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.redirect('/');
});


// router.post( '/', (req, res) => ProcReq.processPost(req, res, ServerUtils.resComplete) );

export default router;