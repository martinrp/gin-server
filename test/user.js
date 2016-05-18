'use strict';

import supertest from 'supertest';
import jsdom from 'jsdom';
import { assert, expect } from 'chai';

// This agent refers to PORT where program is runninng.

let server = supertest.agent('http://localhost:8000');

const username = 'player1';
const password = 'password';

// BUG: Wont run  callbacks so cant run domTests after session load
// Potentially fix by creating a fake session for rest of testing

server
  .post('/login')
  .type('form')
  .send({
    username: username, 
    password: password 
  })
  .expect(200)
  .end(function(err, res){
    console.log('supertest ran');
    if (err) return done(err);
    console.log('res', res);
    jsdom.env(
        res.text,
        function (err, window) {
          runDomTests(window.document);
        }
      );
  });


describe('User Route Call without Session',function(){
  it('Should reject the user as they dont have a session', function(done){
    server
      .get('/user/player1')
      .expect('Content-type',/text/)
      .expect(302)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});

function runDomTests(dom){
  describe('User, DOM Test',function(){

    it('should have a single Submit button', function (done) {
      let button = dom.getElementsByClassName('btn');
      expect(button).to.have.length(1);
      expect(button[0].innerHTML).to.contain('Submit');
      done();
    });

  });
}
