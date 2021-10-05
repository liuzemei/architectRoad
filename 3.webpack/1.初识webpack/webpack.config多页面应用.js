const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: "development",
  devtool: false, // 不生成 source-map
  // 每个入口是一个代码块
  entry: { // mpa multi page application
    main: "./src/index.js",
    login: "./src/login.js"
  },
  // entry: "./src/index.js",
  output: {
    // path 只能是绝对路径 不能是相对路径
    path: path.resolve(__dirname, 'dist'), // 打包后的文件
    filename: "[name].js" // 打包后的文件名
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"]
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "login.html",
      chunks: ["login"]
    })
  ]
}

