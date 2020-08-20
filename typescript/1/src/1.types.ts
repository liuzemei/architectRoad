
//  如果代码里有 export import 之类的代码，那么这个文件就变成了一个模块
// 里面的变量都会成为私有变量
export { }
let name: string = 'liuzemei'
let age: number = 10
let married: boolean = true
let hobbies: string[] = ['打篮球', '写代码']
let interests: Array<string> = ['2']

// 元祖 类似一个数组 它是一个长度和类型都固定的数组
// 1. 长度固定
// 2. 类型可以不一样
let point: [number, number] = [100, 100]
point[0], point[1];
let person: [string, number] = ['刘泽美', 10];



// 枚举类型
// 1. 普通枚举
enum Gender {
  Boy,
  Girl
}
console.log(`GG是${Gender.Boy}`)
console.log(`MM是${Gender.Boy}`)
enum Week {
  Monday = 1,
  Tuesday = 2
}

// 常数枚举
const enum Colors {
  Red,
  Yellow,
  Blue
}
console.log(Colors.Red, Colors.Yellow, Colors.Blue)

const enum Texts {
  A, B, C
}
console.log(Texts.A)

// 任意类型 Anyscript
// 第三方库没有类型定义 类型转换的时候 数据结构太复杂太灵活 any
// let root: HTMLElement | null = document.getElementById('root')
// root!.style.color = 'red'; // ! 的意思是 断言不为空

// null undefined
// null 空 undefined 未定义
// 他们都是其他类型的子类型 你可以把他们付给其他类型的变量
// tsconfig.json -> strictNullChecks: false 
// 意思就是 null 和 undefined 可以赋值给任何类型
// let myname1: string = null;
// let myname2: string = undefined;


let x: number;

// void类型 空的 没有

function greeting(name: string): void {
  console.log(`hell ${name}`)
}
greeting('zhufeng')


// newver 永远不
// nerver 是其他 类型的子类型，代表 不会出现的值
// 1. 永远无法正常结束
// 场景：
// 后台启动的服务： 事件环函数 计划任务
// 写一些单元测试：
function createErrror(message: string): never {
  throw new Error('error' + message)
}

console.log(createErrror('hello'))



// 类型推论 猜
let name2 = 2; //name2: number
name2 = 3;
// name2 = '12'; //Error

//
let name3; // name3: any
name3 = 4
name3 = 'hahah' // ok

// 包装对象   java -> 装箱 和 拆箱  
// 自动在基本类型和对象类型之间切换
// 1. 基本类型上没有方法
// 2. 在内部完成一个装箱的操作 (new String(name4)).toLowerCase()
let name4: string = 'zhufeng'
name4.toLowerCase()

let name5: string | number
// 只能掉 String 和 Number 的公共方法
// name5.toLocaleString
// name5.toString
// name5.valueOf
name5 = 5
//  --> 这里就只能掉Number的方法
name5 = '123'
//  --> 这里就只能调String的方法

let name6: string | number;
// 类型断言
name6 = '123';
(name6 as string).toLowerCase();
// (name6 as number).toFixed(2); //Error 断言错误...


// 字面量类型
let Gender4: 'Boy' | 'Girl';
Gender4 = 'Boy'
Gender4 = 'Girl'
// Gender4 = 'Girl1' // Error 只能赋值初始化的两个值






