/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendConf = function (api, conf) {
  // make sure there is a boot array
  if (!conf.boot) {
    conf.boot = []
  }

  // for brevity
  let boot = conf.boot

  // make sure qpdfviewer boot file is registered
  if (!boot.includes('~@quasar/quasar-app-extension-qpdfviewer/src/boot/qpdfviewer.js')) {
    boot.push('~@quasar/quasar-app-extension-qpdfviewer/src/boot/qpdfviewer.js')
    // make sure boot file transpiles
    conf.build.transpileDependencies.push(/quasar-app-extension-qpdfviewer[\\/]src[\\/]boot/)
    console.log(` App Extension (qpdfviewer) Info: 'Adding qpdfviewer boot reference to your quasar.conf.js'`)
  }

  // make sure there is a css array
  if (!conf.css) {
    conf.css = []
  }

  // for brevity
  let css = conf.css

  // make sure qpdfviewer css goes through webpack to avoid ssr issues
  if (!css.includes('~@quasar/quasar-app-extension-qpdfviewer/src/component/pdfviewer.styl')) {
    css.push('~@quasar/quasar-app-extension-qpdfviewer/src/component/pdfviewer.styl')
    console.log(` App Extension (qpdfviewer) Info: 'Adding pdfviewer.styl css reference to your quasar.conf.js'`)
  }
}

module.exports = function (api, ctx) {
  // register JSON api
  api.registerDescribeApi('QPdfviewer', './component/QPdfviewer.json')

  // extend quasar.conf
  api.extendQuasarConf((conf) => {
    extendConf(api, conf)
  })
}
