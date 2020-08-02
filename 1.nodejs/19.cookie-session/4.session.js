//  记录用户访问服务器的个数

const Koa = require('koa')
const Router = require('@koa/router')
const app = new Koa()
const router = new Router()
const uuid = require('uuid')

app.keys = ['liuzemei']


// session 可以存放敏感信息，这样客户端不能篡改
const session = {} // 就是内存中的对象 （如果重启服务会消失）

const cardName = 'connect.sid'

router.get('/visit', async ctx => {
  let cardId = ctx.cookies.get(cardName)
  if (cardId && session[cardId]) {
    session[cardId].money -= 20
    ctx.body = `你的卡里有余额 ${session[cardId].money}`
  } else {
    let cardId = uuid.v4() // mac 地址 + 时间戳 唯一 
    session[cardId] = { money: 200 }
    ctx.cookies.set(cardName, cardId, { maxAge: 10 * 1000 })
    ctx.body = `欢迎成为会员了 你的卡里有 ${session[cardId].money}`
  }
})

app.use(router.routes())
app.listen(3001)


