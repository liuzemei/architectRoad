// 1. toStringTag 修改 toString
function _1_toStringTag() {
  let toString = Object.prototype.toString
  console.log(toString.call('foo'))
  let myExports = {}

  Object.defineProperty(myExports, Symbol.toStringTag, { value: "Module1" })
  console.log(toString.call(myExports))
}

// 2. Object.create 可以创建一个原型为null的空对象
// Object.create 方法实现
function create(proto) {
  function F() {
  }

  F.prototype = proto
  return new F()
}

const ns = create(null)
console.log(Object.getPrototypeOf(ns))


// Object.defineProperty 定义对象的元属性
let obj = {}
let ageValue = 10
Object.defineProperty(obj, 'age', {
  get() {
    return ageValue
  },
  set(newValue) {
    ageValue = newValue * 2
  },
  enumerable: true, //是否可以枚举
  configurable: true,// 是否可以删除
})


// 按位与
// 比特 二进制 0 和 1
// 每一个位，是数据存储的最小单位
// 每8个位称为一个字节
