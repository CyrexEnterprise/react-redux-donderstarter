/*
 *
 * Webpack DEVELOPMENT configuration file
 *
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config')

module.exports = merge.smart(baseConfig, {
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
    new ExtractTextPlugin({ filename: 'styles.css' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    publicPath: '/',
    historyApiFallback: true,
    port: 9000,
    host: '0.0.0.0',
    noInfo: false,
    inline: true,
    hot: true,
    stats: 'errors-only'
  },

  devtool: 'eval-source-map'
})
