// 默认运行 webpack 命令会调用次文件 webpack的配置文件
// webpack.config.js

// webpack webpack-cli webpack的模块
// vue-loader vue-style-loader css-loader vue-template-compiler
// @babel/core @babel/preset-env babel-loader
// npm i webpack webpack-cli webpack-dev-server vue-loader vue-style-loader css-loader vue-template-compiler @babel/core @babel/preset-env babel-loader html-webpack-plugin -D

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const resolve = (...dir) => path.resolve(__dirname, ...dir);

module.exports = {
  output: {
    // 出口 通过打包的文件产生的结果
    // 配置多入口
    filename: "[name].bundle.js", // 结果的名字
    path: resolve("..", "dist"), // 产生的路径
  },
  resolve: {
    // 解析文件时 按照以下顺序查找后缀
    extensions: [".js", ".vue", ".css", ".jsx"],
  },
  module: {
    //针对不同模块做处理
    rules: [
      {
        // 默认会把 .vue 文件中的样式变成 .css 结尾，所以会走到 .css 的loader
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: {
          options: {
            // 告诉 js文件 需要通过 es6 -> es5 的插件转化
            presets: ["@babel/preset-env"],
          },
          loader: "babel-loader", // 默认使用 babel-loader => bable/core (transform) => preset
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
