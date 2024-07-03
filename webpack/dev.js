const { merge } = require("webpack-merge");
const common = require("./common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 9000,
  },
  devtool: "eval-source-map",
});
