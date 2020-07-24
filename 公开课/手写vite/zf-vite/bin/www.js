#! /usr/bin/env node

// 可以运行的脚本

// 需要通过 http 启动一个模块 内部是基于 koa 的
// 创建一个 koa 的服务

const createServer = require('../index')
createServer().listen(4000, () => {
  console.log('Server start 4000 port', 'http://localhost:4000')
})
