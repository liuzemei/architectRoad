// 通过 入口 打包出一份代码来，代码给 node 来用

const base = require("./webpack.base");
const { merge } = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

const resolve = (...dir) => path.resolve(__dirname, ...dir);
// webpack 打包服务端代码 是不需要引入打包后的js的 只是引入引入前端的打包后的结果
module.exports = merge(base, {
  entry: {
    server: resolve("..", "src", "server-entry.js"),
  },
  // 不写的话，默认是给浏览器用的
  target: "node",
  output: {
    libraryTarget: "commonjs2", // 指定导出方式 -> module.exports
  },
  plugins: [
    new VueSSRServerPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.ssr.html",
      template: resolve("..", "public", "index.ssr.html"),
      excludeChunks: ["server"], // 不引入打包后的结果
      minify: false,
    }),
  ],
});

// 后端打包的结果决定html的内容 前端打包的结果决定事件。
