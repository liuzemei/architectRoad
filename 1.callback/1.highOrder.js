//  高阶函数
// 2个特点，满足其中一个即可
// 1. 如果一个函数的参数中有函数，那么当前这个函数就是高阶函数（回调）
// 2. 如果一个函数返回了一个函数，那么当前这个函数就是高阶函数

// 通过函数 去学习 前端的常见设计模式 => promise

// 核心业务代码
function say() {
  console.log('说话');
}


// 扩展方法
// 当前实例都可以调用所属类原型上的方法
// 谁调用 this 就指向谁
Function.prototype.before = function (cb) { // AOP 切片编程
  // 箭头函数特点： 没有 this  没有 arguments 没有 prototype 不能 new
  // 剩余运算符 可以把所有参数组成一个数组列表 
  return (...args) => {
    cb()
    this(...args)
  }
}

let newSay = say.before(() => {
  console.log('说话前')
})

newSay()

