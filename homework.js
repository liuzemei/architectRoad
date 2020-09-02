// 1. 您的姓名： 刘泽美

// 2. 实现一个函数柯里化

var currying = function (fn) {
  var args = Array.prototype.slice.call(arguments, 1)
  return function () {
    var newArgs = args.concat(Array.prototype.slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}
