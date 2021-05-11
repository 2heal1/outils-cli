const ora = require("ora");
const path = require("path");
const inquirer = require("inquirer");
const download = require("download-git-repo");

const log = require("../../utils/log");
const CONSTANT = require("../../constant");
const generate = require("./generate");
const _ = require("lodash");

async function create(projectName) {
  let config;
  try {
    if (!projectName) {
      log.error("请输入项目名称！");
      return;
    }
    let meta = {
      projectName,
      description: "project description",
      commandName: "commandName",
      author: "author",
      commands: [
        {
          command: "test",
          description: "command description",
          questions: []
        }
      ],
      script: {
        dependencies: ["chalk", "commander", "inquirer"],
        //npm 扩展参数
        npmOption: [],
        //npm 源
        registry: "https://registry.npmjs.org/"
      }
    };
    const { mode } = await inquirer.prompt({
      type: "list",
      name: "mode",
      message: "请选择模式",
      choices: [
        {
          name: "normal（简单创建）",
          value: CONSTANT.MODE.NORMAL
        },
        {
          name: "detail（根据配置创建）",
          value: CONSTANT.MODE.DETAIL
        }
      ]
    });

    if (mode === CONSTANT.MODE.NORMAL) {
      let { commandName } = await inquirer.prompt([
        {
          type: "input",
          name: "commandName",
          message: "请输入工具指令名称 eg: vue、npm ",
          validate: function(input) {
            if (!input) {
              return "内容不能为空";
            }
            return true;
          }
        }
      ]);
      meta.commandName = commandName;

      let { commands } = await inquirer.prompt([
        {
          type: "input",
          name: "commands",
          message:
            "请输入工具所需要的命令名称，以逗号（,）分割。eg: 'create,config' ",
          validate: function(input) {
            if (
              !input
                .replace(/\s/g, "")
                .split(",")
                .filter(item => !!item).length
            ) {
              return "内容不能为空";
            }
            return true;
          }
        }
      ]);
      meta.commands = commands
        .replace(/\s/g, "")
        .split(",")
        .reduce((sum, cur) => {
          if (cur) {
            sum = sum.concat({
              command: cur,
              description: ""
            });
          }
          return sum;
        }, []);
    } else {
      config = require(path.resolve("./outils-config.js"));
      if (!config) {
        log.error(
          "未找到 outils-config.js 文件，请使用 outils config [option]获取相关配置！"
        );
        return;
      }
      meta = _.merge(meta, config);
    }
    // 开始下载
    const spinner = ora("🚀  正在下载模板...");
    spinner.start();
    download(
      "direct:https://github.com/2heal1/outils-cli-template.git",
      projectName,
      { clone: true },
      err => {
        if (err) {
          spinner.fail();
          log.error(err);
        } else {
          spinner.succeed();
          log.success("✨ 下载成功！");
          generate(mode, meta);
        }
      }
    );
  } catch (err) {
    if (!config) {
      log.error(
        "未找到 outils-config.js 文件，请使用 outils config get 获取相关配置！"
      );
    } else {
      log.error(err);
    }
    return;
  }
}
module.exports = async projectName => {
  create(projectName);
};
