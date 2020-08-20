// 1. 接口的兼容性
// ts 跟类型没有别的关系 只跟属性有关系
namespace a {
  interface Animal {
    name: string
    age: number
  }
  interface Person {
    name: string
    age: number
    speak: (words: string) => void
  }
  function getName(animal: Animal): string {
    return animal.name
  }
  let p = {
    name: 'zhufeng',
    age: 10,
    gender: 0
  }
  console.log(getName(p))

  // 基本类型的兼容性
  let num: string | number
  let str: string = 'hello'
  num = str
  str = num
  let num2: {
    toString: () => string
  }
  let str2: string = 'jiagou'
  num2 = str2
  console.log(num2)
}

namespace b {
  // 类的兼容性
  class Animal {
    name: string = ''
  }

  class Bird extends Animal {
    swiming: number = 1
  }
  let a: Animal
  a = new Bird() // 父类的变量能直接指向子类的实例

  let b: Bird
  // b = new Animal() // 子类的变量不能指向父类的实例(假如属性不一致的话)
  b = {
    name: '123',
    swiming: 2
  } // 不管这个对象的具体类型，只要属性有就可以
}

namespace c {
  // 函数的兼容性
  type sumFunction = (a: number, b: number) => number
  let sum: sumFunction
  function f1(a: number, b: number): number { return a }
  sum = f1
  function f2(a: number): number { return a }
  sum = f2
  function f3(): number { return 1 }
  sum = f3
  // 参数只能少不能多
  function f4(a: number, b: number, c: number): number { return a }
  // sum = f4 // Error

  // 比较返回值
  type GetPerson = () => { name: string, age: number }
  let getPerson: GetPerson;
  function g1() { return { name: 's', age: 10 } }
  getPerson = g1
  function g2() { return { name: 's', age: 10, te: 123 } }
  getPerson = g2
  // 返回值只能多不能少
  function g3() { return { name: 's' } }
  // getPerson = g3  // Error

  // interface T {
  //   name: string
  // }
  // let t: T = { name: 'zhufeng', age: 10 }


  // 函数参数的协变
  type logFunc = (a: number | string) => void;
  let log: logFunc
  function log1(a: number | string | boolean) {
    console.log(a)
  }
  log = log1
  log1(true)
  // log(true) // error


  // 泛型的兼容性
  // 先判断具体的类型，再进行兼容性判断
  interface Empty<T> {
  }

  let x: Empty<string>
  let y: Empty<number>
  x = y! // OK

  interface Empty1<T> {
    data: T
  }
  let x1: Empty1<string>
  let y1: Empty1<number>
  // x1 = y1! // Error

  // 枚举的兼容性
  enum Colors {
    Red,
    Yellow
  }
  let c: Colors
  c = Colors.Red
  c = 1 // Yellow
  let d: number
  d = Colors.Yellow // 1


  
















}