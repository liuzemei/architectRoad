const EventEmitter = require('events')
const http = require('http')
const path = require('path')
const fs = require('fs')
const Stream = require('stream')

const context = require('./context')
const request = require('./request')
const response = require('./response')


class Application extends EventEmitter {
  constructor() {
    super()
    this.context = Object.create(context)
    this.response = Object.create(response)
    this.request = Object.create(request)
    this.middlewares = []

  }


  use(callback) {
    this.middlewares.push(callback)
  }

  createContext(req, res) {
    // ctx.__proto__ = context
    let ctx = Object.create(this.context)
    let response = Object.create(this.response)
    let request = Object.create(this.request)
    ctx.request = request;
    ctx.req = ctx.request.req = req;
    ctx.response = response;
    ctx.res = ctx.response.res = res;
    return ctx
  }

  compose(ctx) {
    //  将多个 promise 链接到一起 组成一个 promise 链 一次执行 function next(){}
    let index = -1 // 默认计数
    const dispatch = i => {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      if (i === this.middlewares.length) return Promise.resolve()

      let middleware = this.middlewares[i]
      // 调用 next 方法 会找到下一个中间件执行
      return Promise.resolve(middleware(ctx, () => dispatch(++i)))
    }
    return dispatch(0)
  }

  handleRequest() {
    return (req, res) => {
      // 将 req 和 res 进行一次包装 => ctx 上下文
      res.statusCode = 404
      let ctx = this.createContext(req, res)
      // this.requestCallback(ctx) // 调用了用户的回调方法，将ctx传入，内部会给 ctx.body 复制
      this.compose(ctx).then(() => {
        let { body } = ctx
        if (body) {
          if (body instanceof Stream) {
            body.pipe(res)
          } else if (typeof body === 'object') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(body))
          } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
            res.end(body)
          } else if (typeof body === 'number') {
            res.end(body + '')
          }
        } else {
          res.end('Not Found')
        }
        res.end(ctx.body)

      })
    }
  }

  listen(...args) {
    let server = http.createServer(this.handleRequest())
    server.listen(...args)
  }


}

module.exports = Application