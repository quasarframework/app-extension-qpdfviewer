/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const extendConf = function (conf) {
  // make sure qpdfviewer boot file is registered
  conf.boot.push('~@quasar/quasar-app-extension-qpdfviewer/src/boot/qpdfviewer.js')
  console.log(` App Extension (qpdfviewer) Info: 'Adding qpdfviewer boot reference to your quasar.conf.js'`)

  // make sure boot & component files transpile
  conf.build.transpileDependencies.push(/quasar-app-extension-qpdfviewer[\\/]src/)

  // make sure qpdfviewer css goes through webpack to avoid ssr issues
  conf.css.push('~@quasar/quasar-app-extension-qpdfviewer/src/component/pdfviewer.styl')
  console.log(` App Extension (qpdfviewer) Info: 'Adding pdfviewer.styl css reference to your quasar.conf.js'`)
}

const extendWebpack = function (cfg, { isClient, isServer }, api) {
  if(api.ctx.modeName === "electron") {
    cfg.plugins.push(
      new CopyPlugin([
        {
          from: path.resolve(__dirname, 'lib', 'pdfjs'),
          to: 'statics/pdfjs'
        }
      ])
    )
  }
}

module.exports = function (api) {
  // quasar compatibility check
  api.compatibleWith('@quasar/app', '^1.0.0')

  // register JSON api
  api.registerDescribeApi('QPdfviewer', './component/QPdfviewer.json')

  // extend quasar.conf
  api.extendQuasarConf(extendConf)

  // extend webpack
  api.extendWebpack(extendWebpack)
}
