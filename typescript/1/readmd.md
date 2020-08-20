# 模块
- AMD CMD require.js sea.js
- node commonjs commonjs2
- es6 module
- umd 兼容以上三种


## 
`esModuleInterop`:
/* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
在 commondjs 规范里可以使用 ES6 规范。
a.js 
```js
exports.a = 'a';
exports.b = 'b'; //commonjs

module.exports = 'mod'
```
b.js
```js
import moduleA, {a,b}  from './moduleA';// es6module
```