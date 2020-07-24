const Koa = require('./koa') // 封装 web 服务 （通过类来创建）

const app = new Koa() // 创建一个 Koa 服务

// 默认不会执行，当请求到来时会执行此方法
app.use((req,res) => { // 扩展了 req, res
  // ctx.body = 'hello world'
  res.end('1234')

})

// 创建一个 http 服务
app.listen(3000, () => {
  console.log(`server Start 3000`)
})

app.on('error', err => {
  console.log(err, '----------------')
})