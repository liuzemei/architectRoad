#! /usr/bin/env node

// 可执行文件一般都会增加命令行参数解析 process.argv
// 可以使用 commander 来进行解析用户的参数 @babel/node -> 把 es6 的规范变成 commandJs 规范

// commander 解析命令行参数
// chalk  命令行颜色
// ejs
// mime


const program = require('commander')
const packageJson = require('../package.json')
const userOptions = require('./config')
const { valueForEach } = require('../utils')

const usages = []
valueForEach(userOptions, (option) => {
  program.option(option.option, option.description)
  usages.push(option.usage)
})

program.name('zs') // 解析 usage 的使用

program.usage('--option <value>') // usage 后边的描述

// program.option()

program.version(packageJson.version) // 显示版本号 提供 --version 命令

program.on('--help', () => { // 追加使用项
  for (let value of usages) {
    console.log(value)
  }
})


const userConfig = program.parse(process.argv) // 解析用户参数
const defaultConfig = {
  port: 8080,
  address: 'localhost',
  directory: process.cwd(),
  ...userConfig
}


// 只要写一个第三方命令行模块 都要做的事情

// 1. 启动一个服务
let createServer = require('../src/server')
let server = createServer(defaultConfig)

server.start()


