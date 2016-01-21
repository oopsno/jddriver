'use strict';

var should = require('should');
var jdlingyu = require('../spider/jdlingyu.js');

describe('jdlingyu.net', function () {
  describe('#page_url(n)', function () {
    it('should return a page url when `n` is a integer >= 2', function () {
      jdlingyu.page_url(42).should.equal('http://www.jdlingyu.net/page/42/');
    });
    it('and should return homepage url when `n` is NOT a integer >= 2', function () {
      jdlingyu.page_url(0).should.equal(jdlingyu.home_url);
      jdlingyu.page_url(3.14).should.equal(jdlingyu.home_url);
      jdlingyu.page_url('meow').should.equal(jdlingyu.home_url);
    });
  });
});