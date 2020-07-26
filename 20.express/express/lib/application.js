const http = require('http')
const Router = require('./router')

const methods = require('methods')

methods.forEach(method => {
    Application.prototype[method] = function (path, ...handlers) {
        // 让子类暴露一个方法，父类调用方法去操作 
        this._router[method](path, handlers)
    }
})




// 将应用和路由的逻辑进行一个拆分
function Application() { // 方便扩展
    this._router = new Router();
}
Application.prototype.listen = function () {
    const server = http.createServer((req, res) => {
        // 当请求到来时 交给我们的路由自己去处理
        function done() {
            res.end(`Cannot ${req.method} ${req.url}`);
        }
        this._router.handle(req, res, done);
    });
    server.listen(...arguments);
}
module.exports = Application;