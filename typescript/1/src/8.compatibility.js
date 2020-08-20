"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 1. 接口的兼容性
// ts 跟类型没有别的关系 只跟属性有关系
var a;
(function (a) {
    function getName(animal) {
        return animal.name;
    }
    var p = {
        name: 'zhufeng',
        age: 10,
        gender: 0
    };
    console.log(getName(p));
    // 基本类型的兼容性
    var num;
    var str = 'hello';
    num = str;
    str = num;
    var num2;
    var str2 = 'jiagou';
    num2 = str2;
    console.log(num2);
})(a || (a = {}));
var b;
(function (b_1) {
    // 类的兼容性
    var Animal = /** @class */ (function () {
        function Animal() {
            this.name = '';
        }
        return Animal;
    }());
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.swiming = 1;
            return _this;
        }
        return Bird;
    }(Animal));
    var a;
    a = new Bird(); // 父类的变量能直接指向子类的实例
    var b;
    // b = new Animal() // 子类的变量不能指向父类的实例(假如属性不一致的话)
    b = {
        name: '123',
        swiming: 2
    }; // 不管这个对象的具体类型，只要属性有就可以
})(b || (b = {}));
var c;
(function (c_1) {
    var sum;
    function f1(a, b) { return a; }
    sum = f1;
    function f2(a) { return a; }
    sum = f2;
    function f3() { return 1; }
    sum = f3;
    // 参数只能少不能多
    function f4(a, b, c) { return a; }
    var getPerson;
    function g1() { return { name: 's', age: 10 }; }
    getPerson = g1;
    function g2() { return { name: 's', age: 10, te: 123 }; }
    getPerson = g2;
    // 返回值只能多不能少
    function g3() { return { name: 's' }; }
    var log;
    function log1(a) {
        console.log(a);
    }
    log = log1;
    log1(true);
    var x;
    var y;
    x = y; // OK
    var x1;
    var y1;
    // x1 = y1! // Error
    // 枚举的兼容性
    var Colors;
    (function (Colors) {
        Colors[Colors["Red"] = 0] = "Red";
        Colors[Colors["Yellow"] = 1] = "Yellow";
    })(Colors || (Colors = {}));
    var c;
    c = Colors.Red;
    c = 1; // Yellow
    var d;
    d = Colors.Yellow; // 1
})(c || (c = {}));
