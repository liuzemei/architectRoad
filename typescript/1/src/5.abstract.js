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
// 二. 抽象类
var a;
(function (a) {
    var Animal = /** @class */ (function () {
        function Animal() {
            this.name = '';
        }
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super.call(this) || this;
        }
        Cat.prototype.getName = function () {
            return this.name;
        };
        return Cat;
    }(Animal));
    var cat = new Cat();
    cat.name = '猫';
    console.log(cat.getName());
})(a || (a = {}));
// 二. 接口
// 1. 可以用来描述对象，指的是对象有哪些属性，属性是什么类型
// 接口定义
var b;
(function (b) {
    // 实例化接口
    var point = { x: 0, y: 0 };
    // 类可以实现多个接口，但只能继承一个父类
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.speak = function () {
        };
        Person.prototype.eat = function () {
        };
        return Person;
    }());
})(b || (b = {}));
// 静态方法跟继承没有关系。
// 四、继承 和 多态
