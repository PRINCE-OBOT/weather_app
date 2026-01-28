const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { index: "./src/index.js" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/template.html"
    })
  ],
  
  module: {
    rules: [
      {
        test: '/\.html$/i',
        loader: 'html-loader'
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2)$/i,
        type: "asset/resource"
      }
    ]
  }
};
