// 函数的定义
function hello(name: string): void {
  console.log(`hello ${name}`)
}

// type 用来定义一个类型或者类型表明
// 函数类型 =  (参数) => 返回值
type GetUserNameType = (firseName: string, lastName: string) => string;

// 函数表达式
let getUserName: GetUserNameType = function (firstName: string, lastName: string): string {
  return firstName + lastName
}

// 可选参数
function print(name: String, age?: Number, home?: String) {

}

print('zhufeng')

// 默认参数
function ajax(url: string, method: string = 'GET'): void {
  console.log(url, method)
}
ajax('/user')
ajax('/user', 'POST')

// 剩余参数
function sum(...numbers: Array<number>) {
  return numbers.reduce((r, i) => r + i, 0)
}


// 函数重载
let obj: any = {}

// 1. 重载声明。
// 一定要和函数的声明要挨着
function attr(val: string): void;
function attr(val: number): void;
// 上下不能有任何的语句。
function attr(val: any): void {
  if (typeof val === 'string') {
    obj.name = val
  }
  if (typeof val === 'number') {
    obj.age = val
  }
}

attr('123')
attr(123)
// attr(true) // Error

// ts 的箭头函数
type DelayType = (ms: number) => void;
let delay: DelayType = (ms: number): void => {
  setTimeout(() => {
    console.log(123)
  }, ms);
}


