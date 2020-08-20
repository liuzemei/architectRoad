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
// 类型保护
// 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域变量的类型
// 类型保护就是能够通过关键字判断出分支中的类型
var a;
(function (a) {
    function double(input) {
        if (typeof input === 'string') {
            return input + input;
        }
        if (typeof input === 'number') {
            return input * 2;
        }
        if (typeof input === 'boolean') {
            return !input;
        }
    }
    console.log(double(10));
    console.log(double('20'));
    console.log(double(true));
})(a || (a = {}));
var b;
(function (b) {
    var Animal = /** @class */ (function () {
        function Animal() {
            this.name = 'zhufeng';
        }
        return Animal;
    }());
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.swing = 2;
            return _this;
        }
        return Bird;
    }(Animal));
    function getName(a) {
        if (a instanceof Bird) {
            a.swing;
        }
        else {
            a.name;
        }
    }
    // null 保护
    function getFirstLetter(s) {
        // 1. if (s === null) s = ''
        // 2. if(s === null) return 
        // 3. s =  s || ''
        function ensure() {
            s = s || '';
        }
        ensure();
        return s.charAt(0); // 非空断言
    }
    // 链式判断运算符
    var a = { b: 1, c: 2 };
    // -> a && a.b
    console.log(a === null || a === void 0 ? void 0 : a.b);
})(b || (b = {}));
var c;
(function (c) {
    function getButton(button) {
        if (button.class === 'warning') {
            button.text1;
        }
        else {
            button.text2;
        }
    }
    function getNumber(x) {
        if ('swing' in x) {
            x.swing;
        }
        else {
            x.leg;
        }
    }
    // x is Bird1 => 返回一个类型是否是 Bird1 的 Boolean 值
    function isBird(x) {
        return x.legs === 2;
    }
    function getAnimal(x) {
        if (isBird(x)) {
            console.log(x.name1); // x就是一个鸟
        }
        else {
            x.name2;
        }
    }
    var x = { name1: 'Bird', legs: 2 };
    getAnimal(x);
})(c || (c = {}));
var d;
(function (d) {
    var p = {
        name: 'zhufeng',
        fly: function () { },
        eat: function () { }
    };
    // typeof 可以获取一个变量的类型
    var p1 = { name: 'lzm', age: 10 };
    var p2 = { name: 'lzm1', age: 20 };
    var myname = {
        name: 'fe'
    };
    var mylevel = 10;
    function getValueByKey(val, key) {
        return val[key];
    }
    var p4 = {
        name: '',
        age: 0
    };
    var p42 = {
        name: ''
    };
    var p5 = {
        name: '',
        age: 1,
        gender: 'male'
    };
    var p6 = {
        name: '123'
    };
    console.log(p6);
    var p7 = {
        name: '123'
    };
    console.log(1);
})(d || (d = {}));
var e;
(function (e_1) {
    var condition = {
        name2: 'water'
    };
    var condition2 = {
        name4: 'sky'
    };
    var c1 = { name2: '123' };
    var c2 = { name4: '123' };
    var c3 = { name2: '123' };
    var c4 = { name4: '123' };
    var c5 = { name2: '2', name4: '4' };
    var e = 1;
    var e2 = '123';
    var e3 = '123';
    // 4. 获取返回值类型
    function getUserInfo() {
        return { name: 'lzm', age: 25 };
    }
    var user = { name: 'lzm1', age: 26 };
    // 5. 获取构造函数的实例类型 instanceType
    var Person5 = /** @class */ (function () {
        function Person5(name) {
            this.name = name;
            this.name = name;
        }
        return Person5;
    }());
    var p = new Person5('珠峰');
})(e || (e = {}));
