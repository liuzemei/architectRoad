// 泛型
// 在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
// 泛型 <T> 作用域只闲余函数内部使用。
namespace a {
  // 定义函数泛型
  function createArray<T>(length: number, value: T): Array<T> {
    let result: Array<T> = []
    for (let i = 0; i < length; i++) {
      result[i] = value
    }
    return result
  }
  let result = createArray<string>(3, 'x') // 就相当于一个参数
  console.log(result)

  // 2. 类泛型

  // -> 前置知识： 类数组 ArrayLike arguments
  function sum(...args2: any[]) {
    let args: IArguments = arguments;
    for (let i = 0; i < args.length; i++) {
      console.log(args[i])
    }
  }

  sum(1, 2, 3, '4')

  // let root: HTMLElement | null = document.getElementById('root')
  // let children: HTMLCollection = root!.children
  // let childNodes: NodeListOf<ChildNode> = root!.childNodes

  //  -> 定义类泛型
  class MyArray<T>{
    private list: T[] = [];
    add(val: T) {
      this.list.push(val)
    }
    getMax(): T {
      let result = this.list[0]
      for (let i = 1; i < this.list.length; i++) {
        if (this.list[i] > result) {
          result = this.list[i]
        }
      }
      return result
    }
  }
  let arr = new MyArray<number>()
  arr.add(1)
  arr.add(2)
  arr.add(3)

  let result2 = arr.getMax()
  console.log(result2)


  // 接口泛型
  interface Print {
    <T>(a: T): T
  }
  interface Caculate {
    <T>(a: T, b: T): T
  }
  // 运算符“+”不能应用于类型“T”和“T”。
  let print: Print = function <T>(a: T): T {
    return a
  }
  // let add: Caculate = function <T>(a: T, b: T): T {
  //   if (typeof a === 'number' && typeof b === 'number') {
  //     return a + b
  //   }
  //   return a
  // }

  let result4 = print<number>(5)


  // 多个类型参数 如何在不增加中间变量的情况下，交换两个变量的值

  function swap<A, B>(tuple: [A, B]): [B, A] {
    return [tuple[1], tuple[0]]
  }

  let result5 = swap<string, number>(['zhufeng', 10])
  console.log(result5)

  // 默认泛型类型
  function createArray2<T = string>(): T | null {
    let t: T | null = null
    return t
  }
  let result6 = createArray2()

  // 泛型的约束
  // 在函数中使用泛型的时候，由于预先并不知道具体的类型，所以不能访问相应类型的方法
  interface LengthWise {
    length: number
  }
  function logger<T extends LengthWise>(val: T) {
    console.log(val.length)
  }
  logger('zhufeng')

  // 接口属性泛型
  interface Cart<T> {
    list: T[]
  }
  let cart: Cart<string> = {
    list: ['1', '2']
  }


  // 泛型类型别名
  type Cart1<T> = { list: T[] } | T[]

  let c1: Cart1<string> = { list: ['1'] }
  let c2: Cart1<string> = ['1']

  





}


