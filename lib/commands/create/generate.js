const handlebars = require("handlebars");
const fs = require("fs");
const shell = require("shelljs");
const path = require("path");

const CONSTANT = require("../../constant");
const log = require("../../utils/log");
const writeFileRecursive = require("../../utils/write-file-recursive.js");
const removeFile = require("../../utils/remove-file.js");
const packageCmd = require("./package-cmd");

function generatePackageJson(meta) {
  const inputFileName = `${meta.projectName}/package.hbs`;
  const outputFileName = `${meta.projectName}/package.json`;
  const content = fs.readFileSync(inputFileName).toString();
  const dependencies = meta.script.dependencies.reduce((sum, cur) => {
    // 随便给一个版本，后面会安装最新版
    // 后续考虑增加指定版本功能
    sum[cur] = "1.0.0";
    return sum;
  }, {});
  const result = handlebars.compile(content)({
    ...meta,
    dependencies: JSON.stringify(dependencies, null, 2).slice(),
  });
  fs.writeFileSync(outputFileName, result);
}

function generateProgram(commands, projectName) {
  const template = `  program
    .command('{{{command}}}')
    .description('{{{description}}}')
    .action((...args) => require('../lib/commands/{{{command}}}')(...args));`;
  const programs = commands.map((item) => {
    const result = handlebars.compile(template)(item);
    return result;
  });
  const inputFileName = `${projectName}/bin/index.hbs`;
  const outputFileName = `${projectName}/bin/index.js`;
  const content = fs.readFileSync(inputFileName).toString();
  const result = handlebars.compile(content)({
    programs: programs.reduce((sum, cur) => {
      return sum + "\n" + cur;
    }, ""),
  });
  fs.writeFileSync(outputFileName, result);
}

function generateNormalCommand(commands, projectName) {
  const inputFileName = `${projectName}/lib/template-commands/normal.hbs`;
  const template = fs.readFileSync(inputFileName).toString();

  commands.forEach((item) => {
    const outputFileName = `${projectName}/lib/commands/${item.command}/index.js`;
    const result = handlebars.compile(template)({
      commandName: item.command,
    });
    console.log(outputFileName);
    console.log(result);
    writeFileRecursive(outputFileName, result);
  });
}

function generateDetailCommand(commands, projectName) {
  const inputFileName = `${projectName}/lib/template-commands/detail.hbs`;
  const template = fs.readFileSync(inputFileName).toString();

  commands.forEach((item) => {
    const outputFileName = `${projectName}/lib/commands/${item.command}/index.js`;
    const questions = item.questions;

    const result = handlebars.compile(template)({
      commandName: item.command,
      questions: JSON.stringify(questions, null, 2),
    });
    writeFileRecursive(outputFileName, result);
  });
}

function removeHbsTemplate(meta) {
  removeFile(`${meta.projectName}/lib/template-commands`);
  removeFile(`${meta.projectName}/bin/index.hbs`);
  removeFile(`${meta.projectName}/package.hbs`);
}

module.exports = async (mode, meta) => {
  try {
    generatePackageJson(meta);
    // 生成 bin/index.js
    generateProgram(meta.commands, meta.projectName);
    // 生成相应命令行文件代码
    if (mode === CONSTANT.MODE.NORMAL) {
      generateNormalCommand(meta.commands, meta.projectName);
    } else {
      generateDetailCommand(meta.commands, meta.projectName);
    }
    // 删除模板
    removeHbsTemplate(meta);

    const cmd = packageCmd(meta.script.dependencies.join(" "), meta.script);
    const tempPath = path.resolve(`./${meta.projectName}`);

    log.info('📦  开始安装依赖...')
    shell.exec(`cd ${tempPath} && ${cmd}`);

    log.success("😎 项目创建完成！");
  } catch (err) {
    spinner.fail();
    log.error(err);
  }
};
