/*
 * Webpack PRODUCTION configuration file
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',

  output: { filename: '[name]-[contenthash].js' },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
      template: path.resolve(__dirname, 'src', 'index.html'),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' }),
    new MinifyPlugin({ mangle: { topLevel: true } }),
    new Visualizer({ filename: './statistics.html' }),
    new webpack.HashedModuleIdsPlugin(),
  ],

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
}
