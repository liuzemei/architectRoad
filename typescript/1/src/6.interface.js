"use strict";
// 接口声明
var a;
(function (a) {
    var obj = {
        x: 1,
        y: 2,
        z: 3,
        d: 4
    };
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.speak = function () { };
        Person.prototype.speakChinese = function () { };
        return Person;
    }());
    var circle = {
        PI: 3.14,
        radius: 10
    };
    var cost = function (price) {
        return price * .8;
    };
    var arr = ['1', '2', '3'];
    console.log(arr);
    var obj2 = {
        1: '1',
        2: '2'
    };
    console.log(obj2);
    // 类接口 可以用接口来装饰类 学TS核心 要学会两个：接口+泛型
})(a || (a = {}));
var b;
(function (b) {
    var Dog = /** @class */ (function () {
        function Dog() {
            this.name = 'dog';
        }
        Dog.prototype.speak = function () { };
        return Dog;
    }());
    // 约束构造类型 使用 new 来约束
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        return Animal;
    }());
    function createAnimal(clazz, name) {
        return new clazz(name);
    }
    var a = createAnimal(Animal, 'zhufeng');
    console.log(a);
})(b || (b = {}));
