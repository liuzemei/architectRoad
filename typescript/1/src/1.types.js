"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var name = 'liuzemei';
var age = 10;
var married = true;
var hobbies = ['打篮球', '写代码'];
var interests = ['2'];
// 元祖 类似一个数组 它是一个长度和类型都固定的数组
// 1. 长度固定
// 2. 类型可以不一样
var point = [100, 100];
point[0], point[1];
var person = ['刘泽美', 10];
// 枚举类型
// 1. 普通枚举
var Gender;
(function (Gender) {
    Gender[Gender["Boy"] = 0] = "Boy";
    Gender[Gender["Girl"] = 1] = "Girl";
})(Gender || (Gender = {}));
console.log("GG\u662F" + Gender.Boy);
console.log("MM\u662F" + Gender.Boy);
var Week;
(function (Week) {
    Week[Week["Monday"] = 1] = "Monday";
    Week[Week["Tuesday"] = 2] = "Tuesday";
})(Week || (Week = {}));
console.log(0 /* Red */, 1 /* Yellow */, 2 /* Blue */);
console.log(0 /* A */);
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
var x;
// void类型 空的 没有
function greeting(name) {
    console.log("hell " + name);
}
greeting('zhufeng');
// newver 永远不
// nerver 是其他 类型的子类型，代表 不会出现的值
// 1. 永远无法正常结束
// 场景：
// 后台启动的服务： 事件环函数 计划任务
// 写一些单元测试：
function createErrror(message) {
    throw new Error('error' + message);
}
console.log(createErrror('hello'));
// 类型推论 猜
var name2 = 2; //name2: number
name2 = 3;
// name2 = '12'; //Error
//
var name3; // name3: any
name3 = 4;
name3 = 'hahah'; // ok
// 包装对象   java -> 装箱 和 拆箱  
// 自动在基本类型和对象类型之间切换
// 1. 基本类型上没有方法
// 2. 在内部完成一个装箱的操作 (new String(name4)).toLowerCase()
var name4 = 'zhufeng';
name4.toLowerCase();
var name5;
// 只能掉 String 和 Number 的公共方法
// name5.toLocaleString
// name5.toString
// name5.valueOf
name5 = 5;
//  --> 这里就只能掉Number的方法
name5 = '123';
//  --> 这里就只能调String的方法
var name6;
// 类型断言
name6 = '123';
name6.toLowerCase();
// (name6 as number).toFixed(2); //Error 断言错误...
// 字面量类型
var Gender4;
Gender4 = 'Boy';
Gender4 = 'Girl';
// Gender4 = 'Girl1' // Error 只能赋值初始化的两个值
