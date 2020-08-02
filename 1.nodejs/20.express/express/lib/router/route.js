
const Layer = require('./layer')

const methods = require('methods')

function Route() {
  this.stack = []
  this.methods = {} // 用来表示这个 route 中有哪些方法
}



Route.prototype.dispatch = function (req, res, out) {
  let requestMethod = req.method.toLowerCase()
  let idx = 0
  let next = err => {
    console.log(err)
    if (err) return out(err)
    if (!this.stack[idx]) return out()
    let layer = this.stack[idx++]
    if (layer.method === requestMethod) {
      layer.handle_request(req, res, next)
    } else {
      next()
    }
  }
  next()
}

methods.forEach(method => {
  Route.prototype[method] = function (handles) {
    for (let i = 0; i < handles.length; i++) {
      let layer = new Layer('', handles[i]) // 给里层的 layer 放方法
      layer.method = method
      this.methods[method] = true
      this.stack.push(layer)
    }
  }
})

module.exports = Route