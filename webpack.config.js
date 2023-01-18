const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  name: "hi",
  mode: "development", // 실서비스: production
  // devtool: 'eval' 빠르게, 없으면 가장 빠르게
  // https://webpack.js.org/configuration/devtool/#devtool
  // 알아서 확장자 붙여줌
  resolve: {
    extensions: [".js", ".jsx", ".css"],
  },
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "[hash].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        // 파일명이 .css로 끝나는 모든 파일에 적용
        test: /\.css$/,
        // 배열 마지막 요소부터 오른쪽에서 왼쪽 순으로 적용
        // 먼저 css-loader가 적용되고, styled-loader가 적용되어야 한다.
        // 순서 주의!
        use: ["style-loader", "css-loader"],
        // loader가 node_modules 안의 있는 내용도 처리하기 때문에
        // node_modules는 제외해야 합니다
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    hot: true,
    inline: true,
    host: "localhost",
    port: 3000,
    contentBase: path.join(__dirname, "/docs/"),
  },
};
