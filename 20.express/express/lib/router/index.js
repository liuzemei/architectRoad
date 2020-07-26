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

function Router() {
  this.stack = [];  // 应用的路由系统
}

Router.prototype.route = function (path) {
  let route = new Route()
  let layer = new Layer(path, route.dispatch.bind(route))

  layer.route = route // 表示这个 layer 是一个路由
  this.stack.push(layer)
  return route // 返回 route 的实例
}

Router.prototype.handle = function (req, res, out) {
  let { pathname } = url.parse(req.url);
  let idx = 0

  const next = () => {
    //  1） 如果路由无法处理 交给应用来处理
    if (!this.stack[idx]) return out()
    let layer = this.stack[idx++]
    if (pathname === layer.path) {
      layer.handler(req, res, next) // route.dispatch
    } else {
      next()
    }
  }
  next()
  res.end('ok')
}
module.exports = Router;