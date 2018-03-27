/*
 * Webpack PRODUCTION configuration file
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const API_URL = process.env.API_URL

module.exports = {
  output: { filename: 'app-[hash].js' },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_URL: JSON.stringify(API_URL)
      }
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
      template: path.resolve(__dirname, 'src', 'index.html'),
      minify: {
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin({ filename: '[name]-[hash].css' }),
    new BabiliPlugin(),
    new Visualizer({ filename: './statistics.html' })
  ]
}
