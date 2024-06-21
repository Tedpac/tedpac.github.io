const path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "assets/js/main": "./src/assets/js/main.js",
    "assets/js/animation-manager": "./src/assets/js/animation-manager.js",
    "assets/js/email-address-handler": "./src/assets/js/email-address-handler.js",
  },
  mode: "production",
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
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/index.html", to: "index.html" },
        { from: "./src/assets/css", to: "assets/css" },
        { from: "./src/assets/img", to: "assets/img" },
        { from: "./src/assets/vendor", to: "assets/vendor" },
      ],
    }),
  ],
};
