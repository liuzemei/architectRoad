const Koa = require('./koa')
const app = new Koa()

// js 底层库 原型 + this指向 设计模式





app.use((ctx) => {
  // ctx 封装了原生的 req 和 res
  // 1) 默认 node 自带的属性
  // console.log(ctx.req.url)
  // console.log(ctx.request.req.url)
  // 2) 自己封装request属性
  console.log(ctx.request.url)
  console.log(ctx.url)
  console.log(ctx.query)
  console.log(ctx.path)
  // console.log(ctx.request.query)
  // console.log(ctx.request.path)

  ctx.body = 'hello'
  ctx.response.body = 'world'





  // ctx.res.end('ok2')

})

// 创建一个 http 服务
app.listen(3000, () => {
  console.log(`server Start 3000`)
})

// 多个应用 我们希望 context 不是同一个人
// app.listen(4000, () => {
//   console.log(`server Start 4000`)
// })

app.on('error', err => {
  console.log(err, '----------------')
})