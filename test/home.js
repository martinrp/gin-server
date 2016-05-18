'use strict';

import supertest from 'supertest';
import jsdom from 'jsdom';
import { assert, expect } from 'chai';

// This agent refers to PORT where program is runninng.

let server = supertest.agent('http://localhost:8000');

// Setup dom with JSDom using Supertest.
// Then run tests in JSDom once this has completed.
// TODO: Turn this into a helper
server
  .get('/')
  .end(function(err, res){
    if (err) return done(err);
    jsdom.env(
        res.text,
        function (err, window) {
          runDomTests(window.document, ()=>{ done(); } );
        }
      );
  });

describe('Home Route Call',function(){
  it('Should return home page', function(done){
      server
        .get('/')
        .expect('Content-type',/html/)
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
    });

    it('Should not return a random page ', function(done){
      server
      .get('/foo/bar')
      .expect(404, done); // HTTP response
    });
});

function runDomTests(dom, callback){
  describe('Home, DOM Test',function(){

    it('should have a single Submit button', function (done) {
      let button = dom.getElementsByClassName('btn');
      expect(button).to.have.length(1);
      expect(button[0].innerHTML).to.contain('Submit');
      done();
    });

    it('should have password field', function (done) {
      let pwField = dom.getElementById('password');
      expect(pwField).be.an('object');
      done();
    });

    it('should have username field', function (done) {
      let unField = dom.getElementById('username');
      expect(unField).be.an('object');
      done();
    });

  });
}
