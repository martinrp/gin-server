'use strict';

// Session-persisted message middleware 

export default function loginStatus (req, res, next){ 
  var err = req.session.error 
  , msg = req.session.success;
  delete req.session.error; 
  delete req.session.success; 
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>'; 
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>'; 
  next(); 
};