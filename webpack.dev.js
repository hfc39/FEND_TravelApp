const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const dotenv = require('dotenv')


module.exports = {
  entry: ['./src/client/index.js'],
  mode: 'development', 
  devtool: 'source-map',
  devServer: {
    inline:false,
    contentBase: './dist'
    },
  output: {
    libraryTarget: 'var',
    library: 'Client'
  },
  resolve: {
    extensions: [ '.js', '.jsx']
},
  module: {
    rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  }
                ]
            },
            {
              test: /\.scss$/,
              use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
              test: /\.html$/i,
              loader: 'html-loader',
            },
    ]
},
plugins: [
    new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    }),
    new WorkboxPlugin.GenerateSW(),
    new Dotenv()

]
}