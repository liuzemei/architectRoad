const base = require("./webpack.base");

// mergeOptions   webpack-merge
const { merge } = require("webpack-merge");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const resolve = (...dir) => path.resolve(__dirname, ...dir);
module.exports = merge(base, {
  entry: {
    client: resolve("..", "src", "client-entry.js"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve("..", "public", "index.html"),
    }),
  ],
});
