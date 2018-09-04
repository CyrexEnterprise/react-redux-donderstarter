/*
 * Webpack PRODUCTION configuration file
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

module.exports = {
  mode: 'production',

  output: { filename: 'app-[hash].js' },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
      template: path.resolve(__dirname, 'src', 'index.html'),
      minify: {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({ filename: '[name]-[hash].css' }),
    new BabiliPlugin(),
    new Visualizer({ filename: './statistics.html' })
  ],

  performance: {
    hints: false
  }
}
