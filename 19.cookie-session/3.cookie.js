//  记录用户访问服务器的个数

const Koa = require('koa')

const Router = require('@koa/router')

const app = new Koa()
const router = new Router()

app.keys = ['liuzemei']

router.get('/visit', async ctx => {
  let visit = ctx.cookies.get('visit', { signed: true }) || 0
  ctx.cookies.set('visit', ++visit, { signed: true })
  // console.log(require('crypto').createHmac('sha1', 'liuzemei').update(`visit=${visit}`).digest('base64'))

  ctx.body = `当前你是第${visit}次访问我。`
})

app.use(router.routes())
app.listen(3001)


