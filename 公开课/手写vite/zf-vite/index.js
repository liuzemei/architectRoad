const Koa = require('koa')
const { serveStaticPlugin } = require('./plugins/serverPluginServeStaticPlugin')
const { moduleRewritePlugin } = require('./plugins/serverPluginModuleRewritePlugin')
const { moduleResolvePlugin } = require('./plugins/serverPluginModuleResolvePlugin')

function createServer() {
  const app = new Koa()
  const root = process.cwd()
  // 当用户运行 npm run my-dev 时 会创建服务

  // koa 是基于中间件来运行的
  // 创建一个上下文
  const context = {
    app,  // Koa 实例
    root, // 当前工作目录
  }

  const resolvePlugins = [ // 插件的集合

    // 2）解析 import 重写路径
    moduleRewritePlugin,

    // 3）解析以 /@modules 文件开头的内容 找到对应的结果
    moduleResolvePlugin,
    // 1) 要实现静态服务的功能
    serveStaticPlugin, // 功能是 读取静态文件 将 文件的结果 放在了 ctx.body 上
  ]

  resolvePlugins.forEach(plugin => plugin(context)) // 将上下文给每一个插件

  return app
}


module.exports = createServer