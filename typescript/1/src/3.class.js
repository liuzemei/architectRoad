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
// 类的定义
// 属性“name”没有初始化表达式，且未在构造函数中明确赋值。
// 命名空间
var a;
(function (a) {
    var Person = /** @class */ (function () {
        function Person() {
            // 这是实例的属性，
            // 必须传参
            // 两种传参方式
            this.name = 'namespace';
            this.age = 10;
        }
        return Person;
    }());
    var p1 = new Person();
    console.log(p1.name);
    console.log(p1.age);
})(a || (a = {}));
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'global';
        this.age = 20;
    }
    return Person;
}());
// 属性修饰符
var b;
(function (b) {
    var Person = /** @class */ (function () {
        function Person(name) {
            this.myname = name;
        }
        Object.defineProperty(Person.prototype, "name", {
            get: function () {
                return this.myname;
            },
            set: function (val) {
                this.myname = val.toUpperCase();
            },
            enumerable: false,
            configurable: true
        });
        return Person;
    }());
    var p = new Person('liu');
    console.log(p.name);
    p.name = '123';
    console.log(p.myname);
})(b || (b = {}));
// 公共属性 public
// 只读属性 readonly
var c;
(function (c) {
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
            this.name = name;
            this.age = age;
        }
        return Person;
    }());
    var p = new Person('public', 10);
    console.log(p.name);
    p.name = 'jiagou';
    console.log(p.name);
    // p.age = 12 // Error
})(c || (c = {}));
// 继承 
/**
 * 子类继承父类后 子类的实例上就拥有了父类中的属性和方法
 * 访问修饰符  public protected private
 * public : 自己 自己的子类 和类外部都可以访问
 * protected: 自己 自己的子类 可以访问   类的外部无法访问
 * private: 只能自己访问    自己的子类 和 类的外部 无法访问
 */
//  tsconfig.json -> strictPropertyInitialization = true 后 ，就可以不强制属性初始化了
var d;
(function (d) {
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
            this.amount = 100;
        }
        Person.prototype.getName = function () {
            return this.name;
        };
        Person.prototype.setName = function (newName) {
            this.name = newName;
        };
        return Person;
    }());
    var Student = /** @class */ (function (_super) {
        __extends(Student, _super);
        function Student(name, age, stuNo) {
            var _this = _super.call(this, name, age) || this;
            _this.stuNo = stuNo;
            return _this;
        }
        Student.prototype.getStuNo = function () {
            return this.stuNo;
        };
        Student.prototype.setStuNo = function (newStuNo) {
            this.stuNo = newStuNo;
        };
        return Student;
    }(Person));
    var s = new Student('lzm', 10, 1);
})(d || (d = {}));
// 静态属性、静态方法
var statis;
(function (statis) {
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.getType = function () {
            return this.type;
        };
        Person.type = 'Person';
        return Person;
    }());
    console.log(Person.type);
    console.log(Person.getType());
})(statis || (statis = {}));
