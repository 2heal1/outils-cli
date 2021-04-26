# outils-cli

outils-cli is a tool for helping create cmd project immediately

## 安装

```shell
yarn global add outils-cli
# or
npm i outils-cli -g
```

## 使用说明

```shell
outils --help
```

### 如何使用

1. 确保你已经全局安装了outils-cli以后，在命令行输入
` outils-cli create [项目名]`
2. 选择相应的模式。
    - normal（简单创建） 
      简单模式是生成默认的配置
    - detail（根据配置创建） 
      需要保证当前环境下有配置文件，在使用配置创建之前，需要先运行命令`outils config` 生成默认配置文件
3. 请输入工具指令名称
    意味着输入你需要发布的这个npm包的名字,比如mycli
4. 请输入工具所需要的命令名称，以逗号（,）分割
    该命令意味着，你在发布了你的npm包以后，可以通过 `[工具包] [命令]` 执行相应的命令，比如上面定义了一个指令名称为cli,在这步又定义了create的方法，可以使用`mycli create`来运行方法
5.  上述完成以后，会下载相应的模板
6. 接着可以通过npm link ，接着运行你一开始设置的`[工具包] [命令]` 已经可以使用了。

## ChangeLog

### v0.0.2

#### Feature

init
