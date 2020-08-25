## ssr 的运行过程

- 只是首屏做 ssr 服务端渲染
- 后续的切换逻辑 执行的都是客户端渲染（前端路由来切换）
- vue react 中使用 ssr
- node 服务来实现的 koa

## 整个打包的过程

- 通过一份代码 打包出来两份逻辑 （前端，服务端）
- 前端拿到打包出的 js，后端通过打包的结果渲染出字符串
- 前端的 js + 后端渲染的字符串 => 扔到浏览器上

## 装包

```shell
npm i webpack webpack-cli webpack-dev-server vue-loader vue-style-loader css-loader vue-template-compiler @babel/core @babel/preset-env babel-loader html-webpack-plugin -D
npm i webpack-merge -D
npm i vue-server-renderer-webpack-plugin -D # 可以替换 vue-ssr-plugin -> 性能更好
```


