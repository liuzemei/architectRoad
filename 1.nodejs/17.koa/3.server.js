const Koa = require('./koa')
const app = new Koa()

const sleep = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('sleep')
      resolve()
    }, 100)
  })
}
// 洋葱模型的好处
// 1. 可以做统一的错误处理
// 2. 可以计算整个请求的时间

// 中间件的应用，
// 1）可以统一最先处理一些逻辑
// 2）可以决定是否向下执行
// 3）可以扩展属性和方法

app.use(async (ctx, next) => {
  console.log(1)
  console.time('start')
  try {
    await next()
  } catch (e) {
    console.log(e)
  }
  console.timeEnd('start')

  console.log(2)
})
app.use(async (ctx, next) => {
  console.log(3)
  await sleep()
  await next()
  console.log(4)
})
app.use(async (ctx, next) => {
  console.log(5)
  await next()
  console.log(6)
})

// 这么多函数会被包装成一个函数执行（组合函数 将多个函数组合起来）
// 基于 async + await 的 所有的异步方法在 Koa 中都要封装成 Promise
// Koa 中 所有的 next 前面都要加 await 或者直接 return next()


app.listen(3000, () => {
  console.log(`server Start 3000`)
})
