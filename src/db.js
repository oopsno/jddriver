var pr_fs = require('./fs');
var fs = require('fs');
var os = require('os');
var path = require('path');
var loki = require('lokijs');

function get(name) {
  var db_path = path.join(pr_fs.index, name + '.json');
  return new loki(db_path, {
    autoload: fs.existsSync(db_path),
    autosave: true
  });
}

pr_fs.init();
var db = get('123');
db.save();
db.close();

