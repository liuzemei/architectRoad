const http = require('http')
const Router = require('./router')

const methods = require('methods')





// 将应用和路由的逻辑进行一个拆分
function Application() { // 方便扩展
}

Application.prototype.lazy_route = function () {
  if (!this._router) {
    this._router = new Router();
  }
}

Application.prototype.use = function () {
  this.lazy_route()
  this._router.use(...arguments)
}


methods.forEach(method => {
  Application.prototype[method] = function (path, ...handlers) {
    // 让子类暴露一个方法，父类调用方法去操作 
    this.lazy_route()
    this._router[method](path, handlers)
  }
})
Application.prototype.listen = function () {
  const server = http.createServer((req, res) => {
    // 当请求到来时 交给我们的路由自己去处理
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`);
    }
    this._router.handle(req, res, done);
  });
  this.lazy_route()
  server.listen(...arguments);
}
module.exports = Application;