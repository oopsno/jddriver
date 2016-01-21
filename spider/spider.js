'use strict';

var log4js = require('log4js');
var http = require('http');

var logger = log4js.getLogger('prprman.spider.spider');

exports.fetch_html = function (url, cb) {
  logger.trace('Fetching: ' + url);
  http.get(url, function (response) {
    if (response.statusCode === 200) {
      logger.trace('Connected', url);
      response.setEncoding('utf-8');
      var html = '';
      response.on('data', function (html_piece) {
        html += html_piece;
      });
      response.on('end', function () {
        cb(html);
      });
    } else {
      logger.error('Cannot fetch', url);
    }
  });
};

exports.findall = function (regex, text, cb) {
  var match;
  var matches = [];
  while (null !== (match = regex.exec(text))) {
    matches.push(cb(match));
  }
  return matches;
};
