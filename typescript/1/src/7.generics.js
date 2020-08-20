"use strict";
// 泛型
// 在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
// 泛型 <T> 作用域只闲余函数内部使用。
var a;
(function (a_1) {
    // 定义函数泛型
    function createArray(length, value) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    var result = createArray(3, 'x'); // 就相当于一个参数
    console.log(result);
    // 2. 类泛型
    // -> 前置知识： 类数组 ArrayLike arguments
    function sum() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args2[_i] = arguments[_i];
        }
        var args = arguments;
        for (var i = 0; i < args.length; i++) {
            console.log(args[i]);
        }
    }
    sum(1, 2, 3, '4');
    // let root: HTMLElement | null = document.getElementById('root')
    // let children: HTMLCollection = root!.children
    // let childNodes: NodeListOf<ChildNode> = root!.childNodes
    //  -> 定义类泛型
    var MyArray = /** @class */ (function () {
        function MyArray() {
            this.list = [];
        }
        MyArray.prototype.add = function (val) {
            this.list.push(val);
        };
        MyArray.prototype.getMax = function () {
            var result = this.list[0];
            for (var i = 1; i < this.list.length; i++) {
                if (this.list[i] > result) {
                    result = this.list[i];
                }
            }
            return result;
        };
        return MyArray;
    }());
    var arr = new MyArray();
    arr.add(1);
    arr.add(2);
    arr.add(3);
    var result2 = arr.getMax();
    console.log(result2);
    // 运算符“+”不能应用于类型“T”和“T”。
    var print = function (a) {
        return a;
    };
    // let add: Caculate = function <T>(a: T, b: T): T {
    //   if (typeof a === 'number' && typeof b === 'number') {
    //     return a + b
    //   }
    //   return a
    // }
    var result4 = print(5);
    // 多个类型参数 如何在不增加中间变量的情况下，交换两个变量的值
    function swap(tuple) {
        return [tuple[1], tuple[0]];
    }
    var result5 = swap(['zhufeng', 10]);
    console.log(result5);
    // 默认泛型类型
    function createArray2() {
        var t = null;
        return t;
    }
    var result6 = createArray2();
    function logger(val) {
        console.log(val.length);
    }
    logger('zhufeng');
    var cart = {
        list: ['1', '2']
    };
    var c1 = { list: ['1'] };
    var c2 = ['1'];
})(a || (a = {}));
