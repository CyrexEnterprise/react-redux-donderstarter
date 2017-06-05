/*
 *
 * Webpack PRODUCTION configuration file
 *
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app-[hash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([autoprefixer({ browsers: ['last 3 versions', '> 1%'] })])
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'extended'
              }
            }
          ]
        }))
      }
    ]
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
    new Visualizer({
      filename: './statistics.html'
    })
  ],

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  }
}
