/*!
 * reponse-patch - test/patch.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

require('../');
var http = require('http');
var request = require('supertest');
var should = require('should');

describe('patch.js', function () {

  var app = http.createServer(function (req, res) {
    res.req = req;

    if (req.url === '/send') {
      return res.send('hello');
    }
    if (req.url === '/send/buffer') {
      return res.send(new Buffer('hello你好'));
    }
    if (req.url === '/send/json') {
      return res.send({foo: 'bar'});
    }
    if (req.url === '/json') {
      return res.json({json: 123});
    }
    if (req.url === '/redirect') {
      return res.redirect('/');
    }
    if (req.url === '/redirect/301') {
      return res.redirect('/301', 301);
    }
    if (req.url === '/redirect/302') {
      return res.redirect('/302', '302');
    }
  });

  it('should send(str)', function (done) {
    request(app)
    .get('/send')
    .expect(200, 'hello')
    .expect('Content-Type', 'text/html', done);
  });

  it('should send(buffer)', function (done) {
    request(app)
    .get('/send/buffer')
    .expect(200)
    .expect('Content-Type', 'application/octet-stream', done);
  });

  it('should send(json)', function (done) {
    request(app)
    .get('/send/json')
    .expect(200, '{"foo":"bar"}')
    .expect('Content-Type', 'application/json', done);
  });

  it('should json(json)', function (done) {
    request(app)
    .get('/json')
    .expect(200, '{"json":123}')
    .expect('Content-Type', 'application/json', done);
  });

  it('should redirect()', function (done) {
    request(app)
    .get('/redirect')
    .expect(302)
    .expect('Location', '/', done);
  });

  it('should redirect(301)', function (done) {
    request(app)
    .get('/redirect/301')
    .expect(301)
    .expect('Location', '/301', done);
  });

  it('should redirect(302)', function (done) {
    request(app)
    .get('/redirect/302')
    .expect(302)
    .expect('Location', '/302', done);
  });

});
