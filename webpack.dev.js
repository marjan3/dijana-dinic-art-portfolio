const path = require("path");
const COMMON = require("./webpack.common.js");
const { merge } = require("webpack-merge");

module.exports = merge(COMMON, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "src"),
    writeToDisk: true,
    compress: true,
    port: 3001,
    hot: true,
    watchContentBase: true,
    noInfo: true,
  },
});
