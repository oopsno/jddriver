var os = require('os');
var fs = require('fs');
var path = require('path');
var log4js = require('log4js');
var logger = log4js.getLogger('prprman.fs');
const homedir = os.homedir();
const prpr_root = path.join(homedir, '.prprman');
const prpr_index = path.join(prpr_root, 'index');
const prpr_config = path.join(prpr_root, 'prpr.json');
const default_config = {
  'source': []
};

const init_path = [prpr_root, prpr_index];

function init_configuration() {
  if (!fs.existsSync(prpr_config)) {
    fs.writeFileSync(prpr_config, JSON.stringify(default_config));
    logger.info('Written default configuration to:', prpr_config);
  }
}

function init_dictionary() {
  for (var i = 0; i < init_path.length; i++) {
    var path = init_path[i];
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      logger.info('Created local dictionary:', path);
    }
  }
}

function init() {
  init_dictionary();
  init_configuration();
}

function load_configuration() {
  var cfg = fs.readFileSync(prpr_config);
  return JSON.parse(cfg);
}

exports.init = init;
exports.root = prpr_root;
exports.index = prpr_index;
exports.spiders = path.resolve(__filename, '../../spider');
exports.load_cfg = load_configuration;
