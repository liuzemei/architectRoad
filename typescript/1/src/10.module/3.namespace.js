"use strict";
// 命名空间 第一个作用是封装类似的代码 第二个作用是放置命名冲突
var zoo;
(function (zoo) {
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        return Dog;
    }());
    zoo.Dog = Dog;
})(zoo || (zoo = {}));
var home;
(function (home) {
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        return Dog;
    }());
    home.Dog = Dog;
})(home || (home = {}));
var dog = new home.Dog();
