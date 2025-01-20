const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devtool: 'source-map',
  output: {
    assetModuleFilename: "assets/[hash][ext][query]",
    filename: 'main.js',
    path: path.join(__dirname, 'out'),
    clean: true,
  },
  module: {
    rules: [
      {
      test: /\.html$/i,
      loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
      test: /\.(gif|png|jpg|jpeg|svg)$/i,
      type: 'asset/resource',
      }
    ]
  }
}
