#!/usr/bin/env node
'use strict';
var http = require('http');
var log4js = require('log4js');
var logger = log4js.getLogger();

function page_url(n) {
  if (n <= 1) {
    return 'http://www.jdlingyu.net/';
  } else {
    return 'http://www.jdlingyu.net/page/' + n + '/';
  }
}

function findall(regex, text, cb) {
  var match;
  var matches = [];
  while (null !== (match = regex.exec(text))) {
    matches.push(cb(match));
  }
  return matches;
}

function fetch_html(url, cb) {
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
}

function find_all_image(html) {
  var regex = /http:\/\/www\.jdlingyu\.net\/wp-content\/uploads\/[-_\/]+\.jpg/ig;
  var images = findall(regex, html, function (m) {
    return m[0];
  });
  images.forEach(function (i) {
    console.log(i);
  });
}

function find_all_title(html) {
  var regex = /(http:\/\/www\.jdlingyu\.net\/\d+\/).{256,384}<span class=.bg.>([^<]*)<\/span>/ig;
  var matches;
  while (null !== (matches = regex.exec(html))) {
    console.log(matches[1], matches[2]);
    logger.trace('Updating pictures from', matches[1]);
    fetch_html(matches[1], find_all_image);
  }
}

function scan_list_page(n) {
  var url = page_url(n);
  fetch_html(url, find_all_title);
}

function entrance() {
  for (var i = 2; i <= 2; i++) {
    scan_list_page(i);
  }
}

entrance();
