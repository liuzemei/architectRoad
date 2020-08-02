const url = require('url');

const Route = require('./route')
const Layer = require('./layer')

const methods = require('methods')

methods.forEach(method => {
  Router.prototype[method] = function (path, handlers) {
    // const layer = new Layer(path, handlers)
    let route = this.route(path) // 创造一个 route ，还要创造一个 layer 关系是 layer挂着 route
    route[method](handlers)
  }
})

function Router() { // new Router 的时候 默认返回一个引用类型，这个引用类型会作为当前的实例
  let router = (req, res, next) => {
    router.handle(req, res, next) // 调用不同的路由系统去处理自己相关逻辑
  }
  router.stack = []
  router.__proto__ = proto // 实现了一个继承

  return router
}

let proto = {}

proto.use = function () {
  let path
  Array.from(arguments).forEach((item, idx) => {
    if (idx === 0) path = typeof item === 'string' ? item : '/'
    if (typeof item === 'function') {
      let layer = new Layer(path, item)
      this.stack.push(layer)
    }
  })
}

proto.route = function (path) {
  let route = new Route()
  let layer = new Layer(path, route.dispatch.bind(route))

  layer.route = route // 表示这个 layer 是一个路由
  this.stack.push(layer)
  return route // 返回 route 的实例
}

proto.handle = function (req, res, out) {
  let { pathname } = url.parse(req.url);
  let idx = 0
  let removed = ''
  const next = (err) => {
    //  1） 如果路由无法处理 交给应用来处理
    if (!this.stack[idx]) return out()
    let layer = this.stack[idx++]
    if (removed.length) {
      req.url = removed + req.url
      removed = '' // 清空 removed
    }
    if (err) {
      // 1. 中间件 
      // 2. 得函数参数是四个
      // 满足这两点就说明是一个错误处理中间件
      if (!layer.route) {
        layer.handle_error(err, req, res, next)
      } else {
        next(err)
      }
      return out()
    }
    if (layer.match(pathname)) {
      if (!layer.route) return layer.handler(req, res, next)
      if (!layer.route.methods[req.method.toLowerCase()]) return out()
      if (layer.handler.length === 4) return next()
      //  需要更改 pathname 属性 /user
      if (layer.path !== '/') {
        removed = layer.path
        req.url = pathname.slice(removed.length)
      }
      req.params = layer.params
      layer.handler(req, res, next) // route.dispatch
    } else {
      next()
    }
  }
  next()
  res.end('ok')
}
module.exports = Router;