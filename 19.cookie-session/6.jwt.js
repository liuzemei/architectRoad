
const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const jwt = require('jwt-simple')
const crypto = require('crypto')

const router = new Router()


app.use(bodyParser())

const myJWT = {
  toBase64(obj) {
    return this.toBase64URL(Buffer.from(JSON.stringify(obj)).toString('base64'))
  },
  toBase64URL(r) {
    return r.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
  },
  sign(content, secret) {
    let r = crypto.createHmac('sha256', secret).update(content).digest('base64')
    return this.toBase64URL(r)
  },
  encode(payload, secret) {
    let header = this.toBase64({ typ: "JWT", alg: "HS256" })
    let content = this.toBase64(payload)
    let sign = this.sign(header + '.' + content, secret)
    return [header, content, sign].join('.')
  },
  toBase64URLUnescape(str) {
    str += new Array(5 - str.length % 4).join('=')
    return str.replace(/\-/g, '+').replace(/_/g, '/')
  },
  decode(token, secret) {
    let [header, content, sign] = token.split('.')
    let newSign = this.sign([header, content].join(','), secret)
    if (sign === newSign) {
      return Buffer.from(this.toBase64URLUnescape(content), 'base64').toString()
    } else {
      throw new Error('篡改了')
    }
  }
}


// 登录功能

router.post('/login', async ctx => {
  let { username, password } = ctx.request.body
  console.log(username, password)

  // 如果用户名和密码相同就登录成功
  if (username === password) {
    let token = jwt.encode({ name: username }, 'zfpx')
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYWRtaW4ifQ.7GwCBRQ9eJmS-KmRttQ19aiuaIZHNXJKrp8s8fRcsuY
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYWRtaW4ifQ.7GwCBRQ9eJmS-KmRttQ19aiuaIZHNXJKrp8s8fRcsuY
    console.log(myJWT.encode({ name: username }, 'zfpx'))
    ctx.body = {
      err: 0,
      token
    }

  }

})



// 校验用户是否登录

router.get('/validate', async ctx => {
  let data = '123'
  try {
    let authorization = ctx.headers['authorization']
    data = jwt.decode(authorization, 'zfpx')
  } catch (e) {
    console.log(e.message)
  }
  ctx.body = data

})


app.use(router.routes())
app.listen(3001)
