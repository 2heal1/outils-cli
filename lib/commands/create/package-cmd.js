const shell = require('shelljs');

module.exports = (cmd,appConfig ,isRemove) => {
  var action = "";
  if (shell.which("yarn")) {
    action = isRemove ? "remove" : "add";
    cmd = "yarn " + action + " " + cmd;
  } else if (shell.which("npm")) {
    action = isRemove ? "uninstall" : "install";
    cmd = "npm " + action + " " + cmd;
  }
  if (!isRemove) {
    cmd +=
      " --register=" +
      (appConfig.register || "https://registry.npmjs.org/");
  }
  appConfig.npmOption && (cmd += " " + appConfig.npmOption.join(" "));
  return cmd;
};
