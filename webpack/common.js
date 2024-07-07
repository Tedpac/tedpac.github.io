const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // biome-ignore lint/style/noUnusedTemplateLiteral: syntax recommended by the documentation.
      `...`, // Extend existing minimizers.
      new CssMinimizerPlugin(),
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
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/site.webmanifest", to: "site.webmanifest" },
        { from: "./src/assets/img", to: "assets/img" },
        { from: "./src/assets/vendor", to: "assets/vendor" },
      ],
    }),
  ],
};
