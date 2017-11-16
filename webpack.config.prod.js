/*
 *
 * Webpack PRODUCTION configuration file
 *
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config')

module.exports = merge.smart(baseConfig, {
  output: {
    filename: 'app-[hash].js'
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      minify: {
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin({ filename: '[name]-[hash].css' }),
    new BabiliPlugin(),
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'src', 'assets'), to: 'assets' }]),
    new Visualizer({
      filename: './statistics.html'
    })
  ]
})
