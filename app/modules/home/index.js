'use strict';

import express from 'express';
import UserLang from '../../utils/user-language';

let router = express.Router();

function _handleGet(req, res){
  let language = UserLang.getPrimaryLang(req.headers['accept-language']);

  res.locals = {
    title: 'Welcome to the Gin Server',
    method: req.method,
    language: language,
    _csrfToken: req.csrfToken()
  }

  res.render(__dirname + '/index');
}

router.get( '/', (req, res) => _handleGet(req, res) );

export default router;