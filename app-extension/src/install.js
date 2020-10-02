/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */

function extendPackageJson (api) {
  const dependencies = {
    'pdfjs-dist': '^2.5.0'
  }

  const devDependencies = {
    'worker-loader': '^3.0.2'
  }

  api.extendPackageJson({
    dependencies,
    devDependencies
  })
}

module.exports = function (api) {
  extendPackageJson(api)
}
