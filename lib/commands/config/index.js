const fs = require("fs");
const path = require("path");
const log = require("../../utils/log");
const defaultConfig = require("./default-config");
const generateJs = require("./generate-js");

async function getConfig() {
  await fs.writeFile(
    path.resolve("./outils-config.js"),
    generateJs(JSON.stringify(defaultConfig, null, 2)),
    (err) => {
      if (err) throw err;
    }
  );
  log.success("已导出 outils-config.js");
}

module.exports = async () => {
  getConfig();
};
