/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendConf = function (conf, api) {
  // make sure qpdfviewer boot file is registered
  conf.boot.push('~@quasar/quasar-app-extension-qpdfviewer/src/boot/qpdfviewer.js')
  console.log(` App Extension (qpdfviewer) Info: 'Adding qpdfviewer boot reference to your quasar.conf.js'`)

  if (api.hasVite !== true) {
    // make sure boot & component files transpile
    conf.build.transpileDependencies.push(/quasar-app-extension-qpdfviewer[\\/]src/)
  }

  // make sure qpdfviewer css goes through webpack to avoid ssr issues
  conf.css.push('~@quasar/quasar-app-extension-qpdfviewer/src/component/pdfviewer.sass')
  console.log(` App Extension (qpdfviewer) Info: 'Adding pdfviewer.sass css reference to your quasar.conf.js'`)
}

module.exports = function (api) {
  // quasar compatibility check
  api.compatibleWith('quasar', '^2.0.0')

  if (api.hasVite === true) {
    api.compatibleWith('@quasar/app-vite', '^1.0.0-alpha.0')
  }
  else {
    // should be "@quasar/app-webpack" but that is not backward compatible
    api.compatibleWith('@quasar/app', '^3.0.0')
  }

  // register JSON api
  api.registerDescribeApi('QPdfviewer', './component/QPdfviewer.json')

  // extend quasar.conf
  api.extendQuasarConf(extendConf)
}
