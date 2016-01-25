var spider = require('./spider.js');
var log4js = require('log4js');
const module_name = 'jdlingyu';
const home_url = 'http://www.jdlingyu.net/';

var logger = log4js.getLogger('spider.jdlingyu');

function find_all_image(html) {
  var regex = /http:\/\/www\.jdlingyu\.net\/wp-content\/uploads\/[0-9-_\/]+\.jpg/ig;
  var images = spider.findall(regex, html, function (m) {
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
    spider.fetch_html(matches[1], find_all_image);
  }
}

function page_url(n) {
  if (Number.isInteger(n) && n >= 2) {
    return 'http://www.jdlingyu.net/page/' + n + '/';
  } else {
    return exports.home_url;
  }
}

function scan_list_page(n) {
  var url = page_url(n);
  spider.fetch_html(url, find_all_title);
}

/** exports module name */
exports.name = module_name;
exports.home_url = home_url;
exports.page_url = page_url;
exports.scan_list_page = scan_list_page;
