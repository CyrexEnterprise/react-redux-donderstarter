/*
 * Webpack DEVELOPMENT configuration file
 */

const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
    stats: {
      modules: false,
      colors: true,
    },
  },

  devtool: 'cheap-module-source-map',
}
