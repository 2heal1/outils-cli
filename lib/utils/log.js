const chalk = require('chalk');

module.exports = {
  info(...msg) {
    console.log(chalk.bgBlue.black(' INFO '), chalk.blue(msg.join(' ')));
  },
  success(...msg) {
    console.log(chalk.bgGreen.black(' SUCCESS '), chalk.green(msg.join(' ')));
  },
  warning(...msg) {
    console.log(chalk.bgYellow.black(' WARNING '), chalk.yellow(msg.join(' ')));
  },
  error(...msg) {
    console.log(chalk.bgRed.black(' ERROR '), chalk.red(msg.join(' ')));
  }
};
