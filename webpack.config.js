/*
 *
 * Webpack DEVELOPMENT configuration file
 *
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
            'css-loader',
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

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  devtool: 'eval-source-map'
}
