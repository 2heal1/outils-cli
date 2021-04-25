const rimraf = require("rimraf");
const log = require("./log");

module.exports = path => {
  rimraf(path, function(err) {
    if (err) {
      log.error(err);
    }
  });
};
