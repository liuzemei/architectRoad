const Koa = require('koa')

const app = new Koa()
const bodyParse = require('./bodyParse')


// 登录功能 访问  /login 的时候显示一个表单 => 提交数据 post /login (解析请求体返回结果）

app.use(bodyParse())

app.use(async (ctx, next) => {
  if (ctx.method === 'GET' && ctx.path === '/login') {
    ctx.body = `
    <form action="/login" method="post">
  <input type="text" name="username">
  <input type="text" name="password">
  <button>提交</button>
</form>`
  } else {
    await next()
  }
})

const body = ctx => { // 我可以
}


app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/login') {
    let arr = []
    ctx.body = ctx.request.body
  } else {
    next()
  }
})

app.listen(3000)