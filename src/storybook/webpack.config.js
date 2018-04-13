const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(process.cwd(), 'src')
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(process.cwd(), 'src')
      }
    ]
  }
}
