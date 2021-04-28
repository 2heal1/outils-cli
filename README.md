# outils-cli

outils-cli is a tool for helping creating cmd project immediately

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
   ```shell
    - normal（简单创建） 
      简单模式是生成默认的配置
    - detail（根据配置创建） 
      需要保证当前环境下有配置文件，在使用配置创建之前，需要先运行命令`outils config` 生成默认配置文件
   ```
3. 输入工具指令名称
    * 意味着输入你需要发布的这个npm包的名字,比如你想创建一个比如你快速操作文件的命令行工具，那么工具指令就叫 fastFile。
4. 输入工具所需要的命令名称，以逗号（,）分割
    该命令意味着，你在发布了你的npm包以后，可以通过 `[工具指令名称] [命令]` 执行相应的命令。
    比如上述说的工具，他有插入和删除的方法，他的命令就是有insert, 你可以通过insert以及后续操作快速插入文件，以及delete 快速删除的操作。在这里你可以输入`insert,delete`(通过逗号分隔)，后续可以使用`fastFile insert`或者`fastFile delete`来运行方法
5.  上述完成以后，会下载相应的模板

6. 接着可以先确认是否在创建的项目名文件夹下，如果不在，先通过cd 到项目文件夹下，再通过npm link ，接着运行你一开始设置的`[工具指令名称] [命令]` 已经可以使用了。

## ChangeLog

### v0.0.3

#### Feature

init
