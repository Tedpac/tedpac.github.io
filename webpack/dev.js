const { merge } = require("webpack-merge");
const common = require("./common.js");

// @ts-ignore
module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 9000,
    watchFiles: ["./src/**/*.html", "./src/**/*.css"],
  },
  devtool: "eval-source-map",
});
