const path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devServer: {
    port: 9000,
  },
  devtool: process.env.NODE_ENV === "development" ? "eval-source-map" : false,
  entry: {
    "assets/js/main": "./src/assets/js/main.js",
  },
  mode: process.env.NODE_ENV || "development",
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
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/index.html", to: "index.html" },
        { from: "./src/site.webmanifest", to: "site.webmanifest" },
        { from: "./src/assets/css", to: "assets/css" },
        { from: "./src/assets/img", to: "assets/img" },
        { from: "./src/assets/vendor", to: "assets/vendor" },
      ],
    }),
  ],
};
