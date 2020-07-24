// 重写 js 中的 import 方法 => from './' '../' '/'
const { readBody } = require('../utils')
const { parse } = require('es-module-lexer') // 解析 import 语法的
const MagicString = require('magic-string') // 因为字符串具有不变性
function rewriteImports(source) {
  let imports = parse(source)[0]
  // imports = [
  //   [
  //     { s: 27, e: 30, ss: 0, se: 31, d: -1 },
  //     { s: 49, e: 58, ss: 32, se: 59, d: -1 },
  //     { s: 68, e: 79, ss: 60, se: 80, d: -1 }
  //   ],
  //   [],
  //   false
  // ]
  if (imports.length) { // 对 import 语法 进行拦截
    //   说明有多条 import 语法
    let magicString = new MagicString(source) // overwrite()
    for (let i = 0; i < imports.length; i++) {
      let { s, e } = imports[i]
      let id = source.substring(s, e) // vue ./App
      // 当前开头是 \ 或者 .不需要重写
      if (/^[^\/\.]/.test(id)) {
        id = `/@modules/${id}`
        magicString.overwrite(s, e, id)
      }
    }
    return magicString.toString() // 将替换后的结果返回
  }
}

exports.moduleRewritePlugin = function ({ app, root }) {
  app.use(async (ctx, next) => {
    await next();
    //  在这里完善了自己的逻辑  洋葱模型
    // console.log(ctx.body) // 流对象
    //   获取 流 中的数据
    if (ctx.body && ctx.response.includes('js')) {
      let content = await readBody(ctx.body)
      const result = rewriteImports(content)
      ctx.body = result
    }

    //  将 重写后的结果 返回回去
  })
}