
let pathToRegExp = require('path-to-regexp')

function Layer(path, handler) {
  this.path = path
  this.handler = handler
  this.keys = []
  this.regExp = pathToRegExp(this.path, this.keys)
  console.log(this.regExp, this.keys)
}


Layer.prototype.match = function (pathname) {
  if (this.path === pathname) return true
  if (!this.route) {
    if (this.path === '/') return true
    return pathname.startsWith(this.path + '/')
  }
  let matches = pathname.match(this.regExp)
  if (matches) {
    let [, ...values] = matches
    this.params = values.reduce((memo, val, idx) => (memo[this.keys[idx].name] = val, memo), {})
    return true
  }
  return false
}

Layer.prototype.handle_request = function (req, res, next) {
  return this.handler(req, res, next)
}

Layer.prototype.handle_error = function (err, req, res, next) {
  if (this.handler.length === 4) return this.handler(err, req, res, next)
  next(err) // 普通中间件继续执行
}

module.exports = Layer