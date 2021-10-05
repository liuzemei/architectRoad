const webpack = require('webpack')
const options = require('./webpack.config.js')


/**
 * compiler就是编译器，它就是 webpack 打包的大管家
 * @type {webpack.Compiler.Watching | webpack.Compiler | webpack.MultiWatching | webpack.MultiCompiler | *}
 */
const compiler = webpack(options)

// 调用 compiler 的run方法
compiler.run((err, stats) => {
  console.log(err)
  console.dir(stats.toJson({
    entries: true, // 有哪些入口
    chunks: true, // 产生了哪些代码块
    module: true, // 产生了哪些模块
    assets: true, // 产生了哪些资源
    files: true, // 产生了哪些文件
  }), { depth: 5 })
})