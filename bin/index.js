#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();

program
  .version(require('../package.json').version)
  .usage("<command> [options] ")

  program
  .command('config get')
  .description('获取配置文件')
  .action((...args) => require('../lib/commands/config')(...args));


program
  .command('create [ProjectName]')
  .description('在当前目录初始化一个命令行工具项目')
  .action((...args) => require('../lib/commands/create')(...args));


program.parse(process.argv);


