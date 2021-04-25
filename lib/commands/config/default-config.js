module.exports = {
  description: "project description",
  commandName: "commandName",
  author: "author",
  commands: [
    {
      command: "command",
      description: "command description",
      questions: [
        {
          type: "list",
          name: "answer1",
          message: "问题1",
          choices: [
            {
              name: "选项1",
              value: "value1"
            },
            {
              name: "选项2",
              value: "value2"
            }
          ]
        },
        {
          type: "input",
          name: "answer2",
          message: "问题2",
          validate: function(input) {
            if (!input) {
              return "内容不能为空";
            }
            return true;
          }
        }
      ]
    }
  ],
  script: {
    dependencies: [],
    //npm 扩展参数
    npmOption: [],
    //npm 源
    registry: "https://registry.npmjs.org/"
  }
};
