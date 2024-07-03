const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/assets/js/main.js",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(?:js|mjs|cjs)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  output: {
    clean: true,
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      scriptLoading: "blocking",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/site.webmanifest", to: "site.webmanifest" },
        { from: "./src/assets/css", to: "assets/css" },
        { from: "./src/assets/img", to: "assets/img" },
        { from: "./src/assets/vendor", to: "assets/vendor" },
      ],
    }),
  ],
};
