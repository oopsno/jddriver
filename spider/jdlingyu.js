var jdlingyu = (function (j) {
  j.home_url = 'http://www.jdlingyu.net/';

  j.page_url = function (n) {
    if (Number.isInteger(n) && n >= 2) {
      return 'http://www.jdlingyu.net/page/' + n + '/';
    } else {
      return j.home_url;
    }
  };


  return j;
})(jdlingyu || {});
module.exports = jdlingyu;