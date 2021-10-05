let fs = require('fs')

/*
* webpack 编译过程
* entries 入口
* module 模块
* chunks 代码块
* assets 文件
* */

class Compiler {
  constructor(config) {
    this.config = config
  }

  run() {// 开始编译了
    let entries = [] // 放着所有的入口  默认情况下一个入口会对应一个代码块 chunks
    let modules = [] // 放着所有的模块
    let chunks = []
    let assets = {} // key 是文件名， value 是文件内容
    let files = [] // 元素都是文件名： files = Object.keys(assets)
    // 5. 确定入口：根据配置中的 entry 找出所有的入口文件
    let entry = path.join(this.config.context, this.config.entry)
    entries.push({ name: 'main', entry })
    // 6. 编译模块：从入口文件触发，调用所有配置的 Loader(如果是非js模块) 对模块进行转译
    // 6.1 先读取此模块的内容
    let entryContent = fs.realpathSync(entry, 'utf8')
    let entrySource = babelLoader(entryContent)
    let entryModule = { id: './src/index.js', source: entrySource, name: 'main' }
    modules.push(entryModule)
    // 先把 entryModule 编译成抽象语法树，然后找到里面的依赖 require import
    // 递归的编译所有的模块
    let cssPath = path.join(this.config.context, 'src', 'index.css')
    let cssContent = fs.realpathSync(cssPath, 'utf8')
    let cssSource = cssLoader(cssContent)
    let cssModule = { id: './src/index.css', source: cssSource, name: 'main' }
    modules.push(cssModule)
    // 7. 输出资源：根据入口和模块之间的依赖关系，组装成一个包含多个模块的 Chunk
    let chunk = { id: "main", modules: [entryModule, cssModule] }
    chunks.push(chunk)
    // 8. 再把每个 Chunk 转换成一个单独的文件加入到输入列表（ps：这步是可以修改输出内容的最后机会）
    for (let chunk of chunks) {
      assets[chunk.id + ".js"] = `(function (modules) {
  return __webpack_require__(__webpack_require__.s = "./src/index.js")
})
({
  "./src/index.js": (function (module, exports) {
    console.log("hello")
  })
})`
    }
    files = Object.keys(assets) // 写入硬盘的文件名的数组
    // 在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
    for (let file in assets) {
      let filePath = path.join(this.config.output.path, this.config.output.filename)
      fs.writeFileSync(filePath, assets[file])
    }
  }
}

function babelLoader(source) {
  return `var sum = function(a,b){return a+b}`
}

function cssLoader(source) {
  return `
let style = document.createElement('style')
style.innerHTML = ${source}
document.head.appendChild(style)`
}

// 1. 初始化参数：从配置文件和Shell语句中读取和合并其他的参数，得出最终的参数
let config = require("./webpack.config")

// 2. 开始编译：用上一步得到的参数初始化 Compiler 对象
let compiler = new Compiler(config)

// 3. 加载所有配置的插件
for (let plugin of config.plugins) {
  plugin.apply(compiler)
}

// 4. 执行对象的 run 方法开始执行编译
compiler.run()