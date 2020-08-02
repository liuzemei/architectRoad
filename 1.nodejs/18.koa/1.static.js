const Koa = require('koa')
const app = new Koa()

const path = require('path')

const static = require('./koa-static')
const Router = require('./koa-router')

// 中间件的注册顺序是有要求的 先走上边的再走下边的
app.use(static(__dirname))
app.use(static(path.resolve(__dirname, 'public')))


// 根据不同的请求方法和路径  返回不同的结果 路由
const router = new Router()

router.get('/add', async (ctx, next) => {
  ctx.body = 'add'
  await next()
})
router.get('/remove', async (ctx, next) => {
  ctx.body = 'remove'
  await next()
})
app.use(router.routes())


app.use(async ctx => {
  ctx.body = 'hello123123'
})


app.listen(3000)