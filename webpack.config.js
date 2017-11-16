/*
 *
 * Webpack DEVELOPMENT configuration file
 *
 */

const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const __PROD__ = process.env.NODE_ENV === 'production'

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
              options: { minimize: __PROD__ }
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

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  }
}
