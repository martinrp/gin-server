'use strict';

import express from 'express';
import UserLang from '../../utils/user-language';
import { isDev } from '../../utils/utils';

let router = express.Router();

function handleGet(req, res){
  let language = UserLang.getPrimaryLang(req.headers['accept-language']);

  res.locals = {
    title: 'Welcome to the Gin Server',
    method: req.method,
    language: language,
  }

  if (!isDev) res.locals._csrfToken = req.csrfToken();

  res.render(__dirname + '/index');
}

router.get( '/', (req, res) => handleGet(req, res) );

export default router;