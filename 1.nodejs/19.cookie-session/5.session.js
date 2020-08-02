//  记录用户访问服务器的个数

const Koa = require('koa')
const Router = require('@koa/router')
const app = new Koa()
const router = new Router()
const uuid = require('uuid')
const session = require('koa-session')

app.keys = ['liuzemei']
const cardName = 'connect.sid'

app.use(session({ maxAge: 10 * 1000 }, app))

router.get('/visit', async ctx => {
  let visit = ctx.session.visit || 0
  ctx.session.visit = ++visit
  ctx.body = `你是第${ctx.session.visit}次访问我`
})

app.use(router.routes())
app.listen(3001)


