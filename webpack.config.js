/*
 * Webpack configuration file
 */

const merge = require('webpack-merge')
const devConfig = require('./webpack.config.dev')
const prodConfig = require('./webpack.config.prod')
const commonConfig = require('./webpack.config.common')

const __PROD__ = process.env.NODE_ENV === 'production'

const conf = merge.smart(commonConfig, __PROD__ ? prodConfig : devConfig)

module.exports = uniquePlugins(conf)

function uniquePlugins (conf) {
  const plugins = []
  const pluginNames = []

  let i = conf.plugins.length
  while (i--) {
    const plugin = conf.plugins[i]
    const pluginName = plugin.constructor.name

    if (pluginNames.indexOf(pluginName) < 0) {
      plugins.push(plugin)
    }

    pluginNames.push(pluginName)
  }

  return {...conf, plugins: plugins.reverse()}
}
