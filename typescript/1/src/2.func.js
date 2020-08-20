"use strict";
// 函数的定义
function hello(name) {
    console.log("hello " + name);
}
// 函数表达式
var getUserName = function (firstName, lastName) {
    return firstName + lastName;
};
// 可选参数
function print(name, age, home) {
}
print('zhufeng');
// 默认参数
function ajax(url, method) {
    if (method === void 0) { method = 'GET'; }
    console.log(url, method);
}
ajax('/user');
ajax('/user', 'POST');
// 剩余参数
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (r, i) { return r + i; }, 0);
}
// 函数重载
var obj = {};
// 上下不能有任何的语句。
function attr(val) {
    if (typeof val === 'string') {
        obj.name = val;
    }
    if (typeof val === 'number') {
        obj.age = val;
    }
}
attr('123');
attr(123);
var delay = function (ms) {
    setTimeout(function () {
        console.log(123);
    }, ms);
};
