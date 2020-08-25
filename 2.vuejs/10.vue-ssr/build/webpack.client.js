const base = require("./webpack.base");

// mergeOptions   webpack-merge
const { merge } = require("webpack-merge");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

const resolve = (...dir) => path.resolve(__dirname, ...dir);
module.exports = merge(base, {
  entry: {
    client: resolve("..", "src", "client-entry.js"),
  },
  plugins: [
    // 前端打包出的结果 只是用于挂载到服务端生成的字符串中
    // new HtmlWebpackPlugin({
    //   template: resolve("..", "public", "index.html"),
    // }),
    new VueSSRClientPlugin(),
  ],
});
