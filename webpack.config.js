const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  watch: true,
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader'
          }, 
          { 
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};