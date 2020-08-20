"use strict";
// 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为。
// 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
// 装饰器的写法分为普通装饰器和装饰器工厂
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 四种装饰器： 类装饰器 属性装饰器 方法装饰器 参数装饰器 
// 类装饰器的声明：用来监视、修改或替换类定义
// tsconfig.json experimentalDecorators 装饰器支持
var a;
(function (a) {
    function enhancer(target) {
        // 1. 修改实例上的属性值
        target.prototype.xx = 'xx';
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person();
    // console.log(Person.xx)
    // console.log(p.name)
    console.log(p.xx);
})(a || (a = {}));
// 属性装饰器
// 装饰属性
var b;
(function (b) {
    // 如果装饰的是个普通属性的话，那么这个 target 指向类的原型
    // 如果装饰的是一个类的static，那么这个target指定类的定义
    console.log();
    function upperCase(target, propertyName) {
        var value = target[propertyName];
        var getter = function () { return value; };
        var setter = function (newVal) {
            value = newVal.toUpperCase();
        };
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
    function propertyEnumerable(flag) {
        return function (target, propertyName) {
        };
    }
    function methodEenumerable(flag) {
        return function (target, methodName, PropertyDescriptor) {
            PropertyDescriptor.enumerable = flag;
        };
    }
    function setAge(age) {
        return function (target, methodName, propertyDescriptor) {
            target.age = age;
        };
    }
    function toNumber(target, methodName, PropertyDescriptor) {
        var oldMethod = PropertyDescriptor.value;
        PropertyDescriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (item) { return parseFloat(item); });
            return oldMethod.apply(this, args);
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'zhufeng';
        }
        Person.prototype.getName = function () {
            console.log('getName');
        };
        Person.getAge = function () {
        };
        Person.prototype.sum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (r, i) { return r + i; }, '');
        };
        __decorate([
            upperCase,
            propertyEnumerable(false)
        ], Person.prototype, "name", void 0);
        __decorate([
            methodEenumerable(true)
        ], Person.prototype, "getName", null);
        __decorate([
            toNumber
        ], Person.prototype, "sum", null);
        __decorate([
            setAge(100)
        ], Person, "getAge", null);
        return Person;
    }());
    var p = new Person();
    // p.name = 'jiagou'
    console.log(p.name);
    // console.log(p.getName)
    for (var key in p) {
        console.log(key);
    }
    console.log(Person.age);
    console.log(p.sum(1, '2', '3'));
})(b || (b = {}));
// 参数装饰器
var c;
(function (c) {
    console.log('cccccccccccccccccccccccccccccccccccccccccccccc');
    // Person.prototype login 1
    function addAge(target, methodName, paramsIndex) {
        console.log(target, methodName, paramsIndex);
        target.age = 10;
    }
    // 方法参数
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.login = function (username, password) {
            console.log(username);
            console.log(password);
            console.log(this.age);
        };
        __decorate([
            __param(1, addAge)
        ], Person.prototype, "login", null);
        return Person;
    }());
    var p = new Person();
    p.login('zhufeng', '234');
})(c || (c = {}));
// 装饰器的执行顺序
// 总结1：
// 属性方法先执行，谁先写先执行谁
// 先参数再方法
// 最后是类
// 如果是同类型的，先执行后写的，(谁离得近先执行谁，执行完了之后，再传给上边的一个)
// 总结2
// 方法和属性装饰器 -> 类装饰器
// 方法和属性的装饰器谁在前谁先执行
// 如果方法中的参数有装饰器，要先于方法执行
