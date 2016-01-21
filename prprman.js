#!/usr/bin/env node
'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('prprman');
var jdlingyu = require('./spider/jdlingyu');

function entrance() {
  logger.trace('Scanning page 1-10 of jdlingyu.net');
  for (var i = 2; i <= 2; i++) {
    jdlingyu.scan_list_page(i);
  }
}

entrance();
