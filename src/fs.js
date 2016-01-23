var os = require('os');
var fs = require('fs');
var path = require('path');
const homedir = os.homedir();
const prpr_root = path.join(homedir, '.prprman');
const prpr_index = path.join(prpr_root, 'index');

const init_path = [prpr_root, prpr_index];

function init() {
  init_path.forEach(function (path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  });
}

exports.init = init;
exports.root = prpr_root;
exports.index = prpr_index;

