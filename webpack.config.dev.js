/*
 * Webpack DEVELOPMENT configuration file
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const API_URL = process.env.API_URL

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_URL: JSON.stringify(API_URL)
      }
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
    new ExtractTextPlugin({ filename: 'styles.css' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    publicPath: '/',
    historyApiFallback: true,
    port: 9001,
    host: '0.0.0.0',
    noInfo: false,
    inline: true,
    hot: true,
    stats: 'errors-only'
  },

  devtool: 'cheap-module-source-map'
}
