const moduleReg = /^@modules\//
const fs = require('fs').promises
const path = require('path')

function resolveVue(root) {
  // Vue3 由五部分组成  runtime-dom runtime-core reactivity shared ，在后端中解析 .vue 文件 compiler-sfc

  // 编译是在后端实现的， 所以我需要拿到的文件是 commonjs 规范的
  const compilerPkgPath = path.join(root, 'node_modules', '@vue/compiler-sfc/package.json')

  // const compilePkg = require(compilerPkgPath) // 获取的是 json 中的内容
  // node_modes/@vue/compiler-sfc/dist/compiler-sfc.cjs.js
  // const compilerPath = path.join(path.dirname(compilerPkgPath), compilerPkgPath.main)

  const resolvePath = name => path.resolve(root, 'node_modules', `@vue/${name}/dist/${name}.esm-bundler.js`)

  const runtimeDomPath = resolvePath('runtime-dom');
  const runtimeCorePath = resolvePath('runtime-core');
  const reactivityPath = resolvePath('reactivity');
  const sharedPath = resolvePath('shared');


  return {
    compiler: compilerPkgPath, // 用户稍后后端进行编译的文件路径
    vue: runtimeDomPath,
    '@vue/runtime-dom': runtimeDomPath,
    '@vue/runtime-core': runtimeCorePath,
    '@vue/reactivity': reactivityPath,
    '@vue/shared': sharedPath,
  }

}

exports.moduleResolvePlugin = function ({ app, root }) {

  const vueResolved = resolveVue(root) // 根据当前运行 vite 的目录解析出一个文件表来，包含着 vue 中 所有的模块

  app.use(async (ctx, next) => {
    if (moduleReg.test(ctx.path)) { // 处理当前请求的路径
      console.log(ctx.path)
      //  将 /@modules 替换掉  /@modules/vue
      const id = ctx.path.replace(moduleReg, '') // vue
      ctx.type = 'js' // 设置响应类型 响应的结果是 js 类型
      //  应该去当前项目下查找 vue 对应的真实的文件
      console.log(id)
      ctx.body = await fs.readFile(vueResolved[id], 'utf8')
    }
    next()

  })
}